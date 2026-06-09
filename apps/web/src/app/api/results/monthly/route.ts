import { NextRequest, NextResponse } from "next/server";
import { findMonthlyResults } from "@/lib/cms-store";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "monthly-result", { limit: 30, windowMs: 60_000 });
  if (limited) return limited;

  const body = (await request.json().catch(() => null)) as { phone?: string } | null;
  if (!body?.phone) {
    return NextResponse.json({ error: "ফোন নম্বর দিতে হবে।" }, { status: 400 });
  }

  const results = await findMonthlyResults(body.phone);
  return NextResponse.json({ results });
}
