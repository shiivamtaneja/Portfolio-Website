import { NextRequest, NextResponse } from "next/server";
import { memoryClient } from "@/lib/chat";

export async function POST(req: NextRequest) {
  try {
    const { content, metadata = {} } = await req.json();

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }

    const result = await memoryClient.add(content, {
      userId: "shivam_portfolio",
      metadata,
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Failed to ingest memory:", error);
    return NextResponse.json(
      { error: "Failed to ingest memory" },
      { status: 500 },
    );
  }
}
