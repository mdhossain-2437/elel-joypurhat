import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const session = await requireApiAdmin(request);
  if (session instanceof NextResponse) return session;
  return NextResponse.json({ admin: session });
}
