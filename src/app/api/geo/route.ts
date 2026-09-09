import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const country = req.headers.get("x-vercel-ip-country") ?? null;
  return NextResponse.json({ country });
}
