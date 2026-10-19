import { NextResponse } from "next/server";
import { mediaLibrary } from "@/lib/data";

export function GET() {
  return NextResponse.json({ resources: mediaLibrary });
}
