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
const recoveryToken = process.env.ADMIN_RECOVERY_TOKEN?.trim();

export type AdminSession = {
  sub: string;
  email: string;
  name: string;
  role: AdminRole;
  iat: number;
  exp: number;
};

function base64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64url");
}

function sign(value: string) {
  return crypto.createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function adminIdFromEmail(email: string) {
  return `admin-${email.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "owner"}`;
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
    passwordChangedAt: null,
  };
}

export function hashPassword(password: string) {
  const salt = crypto.randomBytes(18).toString("base64url");
  const iterations = 210000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("base64url");
  return `pbkdf2$${iterations}$${salt}$${hash}`;
}

export function validatePasswordStrength(password: string) {
  if (password.length < 12) return "পাসওয়ার্ড কমপক্ষে ১২ অক্ষরের হতে হবে।";
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) return "পাসওয়ার্ডে বড় ও ছোট English letter রাখুন।";
  if (!/\d/.test(password)) return "পাসওয়ার্ডে অন্তত একটি সংখ্যা রাখুন।";
  if (!/[^A-Za-z0-9]/.test(password)) return "পাসওয়ার্ডে অন্তত একটি special character রাখুন।";
  return "";
}

export function verifyPassword(password: string, storedHash: string) {
  const [scheme, iterationsRaw, salt, expected] = storedHash.split("$");
  if (scheme !== "pbkdf2" || !iterationsRaw || !salt || !expected) return false;

  const actual = crypto
    .pbkdf2Sync(password, salt, Number(iterationsRaw), 32, "sha256")
    .toString("base64url");
  return safeEqual(actual, expected);
}

export function createSessionToken(admin: AdminUser) {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: AdminSession = {
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
    iat: issuedAt,
    exp: issuedAt + sessionTtlSeconds,
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

async function validateSession(session: AdminSession | null) {
  if (!session) return null;
  const store = await readCmsStore();
  const storeAdmin = store.admins.find((user) => user.email.toLowerCase() === session.email.toLowerCase());

  if (storeAdmin) {
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

  const envAdmin = bootstrapAdmin();
  if (envAdmin && envAdmin.email.toLowerCase() === session.email.toLowerCase()) return session;
  return null;
}

export async function authenticateAdmin(email: string, password: string) {
  const store = await readCmsStore();
  const requestedEmail = email.trim().toLowerCase();
  const envAdmin = bootstrapAdmin();
  const admin =
    store.admins.find((user) => user.email.toLowerCase() === requestedEmail) ||
    (envAdmin && envAdmin.email.toLowerCase() === requestedEmail ? envAdmin : null);

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

export async function changeAdminPassword(email: string, currentPassword: string, nextPassword: string) {
  const strengthError = validatePasswordStrength(nextPassword);
  if (strengthError) return { error: strengthError };

  const store = await readCmsStore();
  const requestedEmail = email.trim().toLowerCase();
  const envAdmin = bootstrapAdmin();
  const existingIndex = store.admins.findIndex((user) => user.email.toLowerCase() === requestedEmail);
  const existingAdmin = existingIndex >= 0 ? store.admins[existingIndex] : null;
  const authAdmin = existingAdmin || (envAdmin && envAdmin.email.toLowerCase() === requestedEmail ? envAdmin : null);

  if (!authAdmin || authAdmin.status !== "ACTIVE" || !verifyPassword(currentPassword, authAdmin.passwordHash)) {
    return { error: "বর্তমান পাসওয়ার্ড সঠিক নয়।" };
  }

  const timestamp = new Date().toISOString();
  const updatedAdmin: AdminUser = {
    ...(existingAdmin || authAdmin),
    id: existingAdmin?.id || adminIdFromEmail(authAdmin.email),
    name: existingAdmin?.name || authAdmin.name,
    email: authAdmin.email,
    role: existingAdmin?.role || authAdmin.role,
    status: "ACTIVE",
    passwordHash: hashPassword(nextPassword),
    createdAt: existingAdmin?.createdAt || timestamp,
    lastLoginAt: timestamp,
    passwordChangedAt: timestamp,
  };

  if (existingIndex >= 0) store.admins[existingIndex] = updatedAdmin;
  else store.admins.unshift(updatedAdmin);

  store.auditLogs.unshift({
    id: `audit-${Date.now().toString(36)}`,
    actor: updatedAdmin.email,
    action: "CHANGE_ADMIN_PASSWORD",
    target: updatedAdmin.id,
    createdAt: timestamp,
    meta: "পাসওয়ার্ড পরিবর্তন করা হয়েছে",
  });

  await writeCmsStore(store);
  return { admin: updatedAdmin };
}

export async function recoverAdminPassword(email: string, token: string, nextPassword: string) {
  if (!recoveryToken || !safeEqual(token.trim(), recoveryToken)) {
    return { error: "Recovery code সঠিক নয়।" };
  }

  const strengthError = validatePasswordStrength(nextPassword);
  if (strengthError) return { error: strengthError };

  const store = await readCmsStore();
  const requestedEmail = email.trim().toLowerCase();
  const envAdmin = bootstrapAdmin();
  const existingIndex = store.admins.findIndex((user) => user.email.toLowerCase() === requestedEmail);
  const existingAdmin = existingIndex >= 0 ? store.admins[existingIndex] : null;
  const allowedEnvAdmin = envAdmin && envAdmin.email.toLowerCase() === requestedEmail ? envAdmin : null;
  const targetAdmin = existingAdmin || allowedEnvAdmin;

  if (!targetAdmin) return { error: "এই ইমেইলের জন্য admin account পাওয়া যায়নি।" };

  const timestamp = new Date().toISOString();
  const updatedAdmin: AdminUser = {
    ...(existingAdmin || targetAdmin),
    id: existingAdmin?.id || adminIdFromEmail(targetAdmin.email),
    name: existingAdmin?.name || targetAdmin.name,
    email: targetAdmin.email,
    role: existingAdmin?.role || targetAdmin.role,
    status: "ACTIVE",
    passwordHash: hashPassword(nextPassword),
    createdAt: existingAdmin?.createdAt || timestamp,
    lastLoginAt: null,
    passwordChangedAt: timestamp,
  };

  if (existingIndex >= 0) store.admins[existingIndex] = updatedAdmin;
  else store.admins.unshift(updatedAdmin);

  store.auditLogs.unshift({
    id: `audit-${Date.now().toString(36)}`,
    actor: updatedAdmin.email,
    action: "RECOVER_ADMIN_PASSWORD",
    target: updatedAdmin.id,
    createdAt: timestamp,
    meta: "Recovery code দিয়ে পাসওয়ার্ড reset করা হয়েছে",
  });

  await writeCmsStore(store);
  return { admin: updatedAdmin };
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  return validateSession(readSessionToken(cookieStore.get(ADMIN_COOKIE)?.value));
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
