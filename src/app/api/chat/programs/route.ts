import { NextResponse } from "next/server";
import { chatProgramsMock } from "@/features/chat/api/programs";

export function GET() {
  return NextResponse.json({ data: chatProgramsMock });
}
