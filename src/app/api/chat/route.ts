import { NextRequest, NextResponse } from "next/server";

import { initGCPAuth } from "@/lib/auth/gcp-auth";

import { generateEmbedding } from "@/lib/embedding";
import {
  appendToConversation,
  getChatsCollection,
  getDbClient,
} from "@/lib/mongo";

import { chatSchema } from "@/schema/chat";

import {
  findRelevantContent,
  generateChatTitle,
  groq,
  prepareHistoryForAI,
  SYSTEM_PROMPT,
} from "@/lib/chat";

export async function POST(req: NextRequest) {
  initGCPAuth();

  const client = await getDbClient();
  const session = client.startSession();
  const chatsCollection = await getChatsCollection();

  try {
    // Parse and validate incoming request
    const { error, data } = await chatSchema.safeParseAsync(await req.json());
    if (error) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 },
      );
    }

    const { message, chatId } = data;

    const [queryEmbedding, existingChat] = await Promise.all([
      generateEmbedding(message),
      chatsCollection.findOne({ chatId }),
    ]);

    // Save user message immediately
    await appendToConversation(chatId, message, null, "user", session);

    // Generate title in background if it's a new chat
    if (!existingChat?.title) {
      generateChatTitle(message).then(async (title) => {
        await chatsCollection.updateOne(
          { chatId },
          { $set: { title } },
          { session },
        );
      });
    }

    // Prepare history and find relevant content
    const chatHistory = prepareHistoryForAI(existingChat);
    const relevantContent = await findRelevantContent(queryEmbedding);

    // Fallback if no relevant content found
    if (!relevantContent) {
      const fallbackResponse =
        "I don't have enough information to answer that question. Feel free to ask me something else about me!";

      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder();
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(fallbackResponse)}\n\n`),
          );
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));

          try {
            await appendToConversation(
              chatId,
              fallbackResponse,
              null,
              "bot",
              session,
            );
          } catch (e) {
            console.error("Failed to append fallback bot response", e);
          }

          controller.close();
        },
      });

      return new Response(stream, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // Stream the AI response
    const aiStreamResponse = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...chatHistory,
        {
          role: "user",
          content: `CONTEXT (Information about Shivam Taneja):\n---\n${relevantContent}\n---\n\nVISITOR'S MESSAGE: ${message}\n\nPlease respond in the first person ("I", "my") as Shivam Taneja using the context above. Use standard markdown formatting.`,
        },
      ],
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      temperature: 0.7,
      max_tokens: 400,
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        let fullBotResponse = "";

        try {
          for await (const chunk of aiStreamResponse) {
            const content = chunk.choices[0]?.delta?.content || "";
            if (content) {
              fullBotResponse += content;
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(content)}\n\n`),
              );
            }
          }
        } catch (streamError) {
          console.error("Stream generation error:", streamError);
          controller.error(streamError);
        } finally {
          try {
            await appendToConversation(
              chatId,
              fullBotResponse,
              null,
              "bot",
              session,
            );
          } catch (e) {
            console.error("Failed to append bot response to chat history", e);
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat error: ", error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
