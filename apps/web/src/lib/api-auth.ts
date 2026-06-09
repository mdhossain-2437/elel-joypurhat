import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, readSessionToken, type AdminSession } from "@/lib/auth";
import { readCmsStore } from "@/lib/cms-store";
import type { AdminRole } from "@/lib/cms-types";

export function getSessionFromRequest(request: NextRequest) {
  return readSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

export function unauthorized() {
  return NextResponse.json({ error: "অনুমতি নেই। আগে লগইন করুন।" }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: "এই কাজ করার অনুমতি আপনার নেই।" }, { status: 403 });
}

async function validateApiSession(session: AdminSession | null) {
  if (!session) return null;
  const store = await readCmsStore();
  const storeAdmin = store.admins.find((user) => user.email.toLowerCase() === session.email.toLowerCase());

  if (!storeAdmin) {
    const bootstrapEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
    return bootstrapEmail && bootstrapEmail === session.email.toLowerCase() ? session : null;
  }
  if (storeAdmin.status !== "ACTIVE") return null;

  const changedAt = storeAdmin.passwordChangedAt ? Math.floor(new Date(storeAdmin.passwordChangedAt).getTime() / 1000) : 0;
  if (changedAt && session.iat < changedAt) return null;

  return {
    ...session,
    sub: storeAdmin.id,
    name: storeAdmin.name,
    role: storeAdmin.role,
  };
}

export async function requireApiAdmin(request: NextRequest, roles?: AdminRole[]): Promise<AdminSession | NextResponse> {
  const session = getSessionFromRequest(request);
  const validatedSession = await validateApiSession(session);
  if (!validatedSession) return unauthorized();
  if (roles && !roles.includes(validatedSession.role)) return forbidden();
  return validatedSession;
}
