import Groq from "groq-sdk";

import { serverEnv } from "@/lib/env/server";
import { getEmbeddingsCollection } from "@/lib/mongo";
import { ChatDocument } from "@/types/chats.types";

export const groq = new Groq({ apiKey: serverEnv().GROQ_API_KEY });

export const SYSTEM_PROMPT = `
You are Shivam Taneja, an experienced software developer. You are currently chatting with a visitor on your personal portfolio website.

IMPORTANT RULES:
1. Speak exclusively in the first person ("I", "my", "me"). Never refer to yourself as an AI assistant.
2. Answer the visitor's questions naturally, casually, and confidently. Be warm and welcoming.
3. Base your knowledge strictly on the provided Context. If the context doesn't contain the answer, politely say you don't have that information or offer a way to get in touch. DO NOT invent or hallucinate facts about your skills or past work.
4. Keep answers relatively short and concise—rarely more than two tiny paragraphs, unless diving into a deep technical explanation.
5. Emphasize your passion for technology! Use markdown formatting (\`code\`, **bold**) to highlight important keywords or technologies, but avoid over-formatting. Keep it conversational.
`;

export async function generateChatTitle(message: string): Promise<string> {
  try {
    const titleRes = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `Generate a short title (max 5 words) for this message: "${message}". Return only the title.`,
        },
      ],
      max_tokens: 15,
    });

    const title = titleRes.choices[0]?.message?.content?.trim() || "New Chat";
    return title.replace(/^["'](.*)["']$/, "$1"); // trim quotes
  } catch (e) {
    console.error("Title generation fail", e);
    return "New Chat";
  }
}

export async function findRelevantContent(
  queryEmbedding: number[],
): Promise<string | null> {
  const embeddingsCollection = await getEmbeddingsCollection();

  const results = await embeddingsCollection
    .aggregate([
      {
        $vectorSearch: {
          index: serverEnv().MONGODB_VECTOR_INDEX_NAME,
          path: serverEnv().MONGODB_VECTOR_PATH_NAME,
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 5,
          similarity: "cosine",
        },
      },
    ])
    .toArray();

  if (!results || results.length === 0) {
    return null;
  }

  return results[0].content;
}

export function prepareHistoryForAI(existingChat: ChatDocument | null) {
  const chatHistory: { role: "user" | "assistant"; content: string }[] = [];

  if (existingChat) {
    for (const msg of existingChat.conversation) {
      chatHistory.push({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.message,
      });
    }
  }

  return chatHistory;
}
