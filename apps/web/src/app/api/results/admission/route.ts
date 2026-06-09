import { NextRequest, NextResponse } from "next/server";
import { findAdmissionResult } from "@/lib/cms-store";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "admission-result", { limit: 18, windowMs: 60_000, blockMs: 3 * 60_000 });
  if (limited) return limited;

  const body = (await request.json().catch(() => null)) as { roll?: string; phone?: string; batch?: string } | null;
  if (!body?.roll || !body.phone) {
    return NextResponse.json({ error: "রোল নম্বর ও ফোন নম্বর দিতে হবে।" }, { status: 400 });
  }

  const result = await findAdmissionResult(body.roll, body.phone, body.batch);
  return NextResponse.json({ result: result || null });
}
