import { NextRequest, NextResponse } from "next/server";

import { initGCPAuth } from "@/lib/auth/gcp-auth";

import {
  appendToConversation,
  getChatsCollection,
  getDbClient,
} from "@/lib/mongo";

import { chatSchema } from "@/schema/chat";

import { generateChatTitle } from "@/lib/chat";

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

    const existingChat = await chatsCollection.findOne({ chatId });

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

    // Stream the WIP response
    const wipResponse =
      "I'm currently a work in progress and will be up or coming soon!";
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();

        try {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(wipResponse)}\n\n`),
          );
        } catch (streamError) {
          console.error("Stream generation error:", streamError);
          controller.error(streamError);
        } finally {
          try {
            await appendToConversation(
              chatId,
              wipResponse,
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
