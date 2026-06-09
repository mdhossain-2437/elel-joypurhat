import "server-only";

import crypto from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AdminRole, AdminUser } from "@/lib/cms-types";
import { readCmsStore, writeCmsStore } from "@/lib/cms-store";

export const ADMIN_COOKIE = "elel_admin_session";
const sessionTtlSeconds = 60 * 60 * 8;
const secret = process.env.ADMIN_SESSION_SECRET || "elel-joypurhat-local-dev-secret-change-me";
const bootstrapAdminEmail = process.env.ADMIN_EMAIL?.trim();
const bootstrapAdminPasswordHash = process.env.ADMIN_PASSWORD_HASH?.trim();

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
};

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function bootstrapAdmin(): AdminUser | null {
  if (!bootstrapAdminEmail || !bootstrapAdminPasswordHash) return null;

  return {
    id: "env-owner",
    name: process.env.ADMIN_NAME?.trim() || "ELeL Joypurhat Admin",
    email: bootstrapAdminEmail,
    role: "OWNER",
    status: "ACTIVE",
    passwordHash: bootstrapAdminPasswordHash,
    createdAt: "2026-06-09T00:00:00.000Z",
    lastLoginAt: null,
  };
}

export function verifyPassword(password: string, storedHash: string) {
  const [scheme, iterationsRaw, salt, expected] = storedHash.split("$");
  if (scheme !== "pbkdf2" || !iterationsRaw || !salt || !expected) return false;

  const actual = crypto
    .pbkdf2Sync(password, salt, Number(iterationsRaw), 32, "sha256")
    .toString("base64url");
  const left = Buffer.from(actual);
  const right = Buffer.from(expected);
  return left.length === right.length && crypto.timingSafeEqual(left, right);
}

export function createSessionToken(admin: AdminUser) {
  const payload: AdminSession = {
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    exp: Math.floor(Date.now() / 1000) + sessionTtlSeconds,
  };
  const encoded = base64url(JSON.stringify(payload));
  return `${encoded}.${sign(encoded)}`;
}

export function readSessionToken(token?: string | null): AdminSession | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || sign(encoded) !== signature) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as AdminSession;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function authenticateAdmin(email: string, password: string) {
  const store = await readCmsStore();
  const requestedEmail = email.trim().toLowerCase();
  const envAdmin = bootstrapAdmin();
  const admin =
    envAdmin && envAdmin.email.toLowerCase() === requestedEmail
      ? envAdmin
      : store.admins.find((user) => user.email.toLowerCase() === requestedEmail);

  if (!admin || admin.status !== "ACTIVE" || !verifyPassword(password, admin.passwordHash)) {
    return null;
  }

  const loginAt = new Date().toISOString();
  if (admin.id !== "env-owner") {
    admin.lastLoginAt = loginAt;
  }
  store.auditLogs.unshift({
    id: `audit-${Date.now().toString(36)}`,
    actor: admin.email,
    action: "ADMIN_LOGIN",
    target: admin.id,
    createdAt: loginAt,
    meta: "সফল লগইন",
  });
  await writeCmsStore(store);
  return admin;
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  return readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value);
}

export async function requireAdmin() {
  const session = await getCurrentAdmin();
  if (!session) redirect("/admin/login");
  return session;
}

export function canManageResults(role: AdminRole) {
  return ["OWNER", "SUPER_ADMIN", "ADMIN", "RESULT_MANAGER"].includes(role);
}

export function canManageContent(role: AdminRole) {
  return ["OWNER", "SUPER_ADMIN", "ADMIN", "EDITOR"].includes(role);
}
