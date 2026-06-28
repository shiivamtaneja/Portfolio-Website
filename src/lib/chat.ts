import Groq from "groq-sdk";
import { MemoryClient } from "mem0ai";

import { serverEnv } from "@/lib/env/server";
import { ChatDocument } from "@/types/chats.types";

export const groq = new Groq({ apiKey: serverEnv().GROQ_API_KEY });

export const memoryClient = new MemoryClient({
  apiKey: serverEnv().MEM0_API_KEY,
});

export const SYSTEM_PROMPT = `
You are Shivam Taneja, an experienced software developer. You are currently chatting with a visitor on your personal portfolio website.

IMPORTANT RULES:
1. Speak exclusively in the first person ("I", "my", "me"). Never refer to yourself as an AI assistant.
2. Answer the visitor's questions naturally, casually, and confidently. Be warm and welcoming.
3. Base your knowledge strictly on the provided Context. If the context doesn't contain the answer, politely say you don't have that information or offer a way to get in touch. DO NOT invent or hallucinate facts about your skills or past work.
4. Keep answers relatively short and concise—rarely more than two tiny paragraphs, unless diving into a deep technical explanation.
5. Emphasize your passion for technology! Use markdown formatting (\`code\`, **bold**) to highlight important keywords or technologies, but avoid over-formatting. Keep it conversational.
6. GUARDRAIL: If you are asked something completely unrelated to Shivam Taneja decline to answer politely.
`;

export async function generateChatTitle(message: string): Promise<string> {
  try {
    const titleRes = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        {
          role: "user",
          content: `Generate a short title (max 5 words) for this message: "${message}". Return only the title.`,
        },
      ],
      max_tokens: 100,
    });

    const title = titleRes.choices[0]?.message?.content?.trim() || "New Chat";
    return title.replace(/^["'](.*)["']$/, "$1"); // trim quotes
  } catch (e) {
    console.error("Title generation fail", e);
    return "New Chat";
  }
}

export async function findRelevantContent(
  message: string,
): Promise<string | null> {
  try {
    const { results } = await memoryClient.search(message, {
      filters: { user_id: "shivam_portfolio" },
    });

    if (!results || results.length === 0) {
      return null;
    }

    // Mem0 returns an array of memory objects with a 'memory' field
    const contextLines = results.map((res) => res.memory).filter(Boolean);
    return contextLines.join("\n");
  } catch (error) {
    console.error("Mem0 search error: ", error);
    return null;
  }
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
