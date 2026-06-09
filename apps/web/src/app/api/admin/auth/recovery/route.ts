import { NextRequest, NextResponse } from "next/server";
import { recoverAdminPassword } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "admin-password-recovery", { limit: 4, windowMs: 15 * 60_000, blockMs: 30 * 60_000 });
  if (limited) return limited;

  const body = (await request.json().catch(() => null)) as
    | { email?: string; recoveryCode?: string; nextPassword?: string; confirmPassword?: string }
    | null;

  if (!body?.email || !body.recoveryCode || !body.nextPassword || !body.confirmPassword) {
    return NextResponse.json({ error: "ইমেইল, recovery code, নতুন পাসওয়ার্ড ও confirmation দিতে হবে।" }, { status: 400 });
  }

  if (body.nextPassword !== body.confirmPassword) {
    return NextResponse.json({ error: "নতুন পাসওয়ার্ড ও confirmation মিলছে না।" }, { status: 400 });
  }

  const result = await recoverAdminPassword(body.email, body.recoveryCode, body.nextPassword);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

  return NextResponse.json({
    ok: true,
    message: "পাসওয়ার্ড reset হয়েছে। এখন নতুন পাসওয়ার্ড দিয়ে লগইন করুন।",
  });
}
