import "server-only";

import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL?.trim();

export const isDbConfigured = Boolean(connectionString);

type GlobalWithPool = typeof globalThis & { __elelPgPool?: Pool };

function needsSsl(url: string) {
  if (/sslmode=disable/i.test(url)) return false;
  if (/localhost|127\.0\.0\.1/i.test(url)) return false;
  return true;
}

export function getPool(): Pool | null {
  if (!connectionString) return null;

  const globalForPool = globalThis as GlobalWithPool;
  if (globalForPool.__elelPgPool) return globalForPool.__elelPgPool;

  const pool = new Pool({
    connectionString,
    max: 3,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 10_000,
    ssl: needsSsl(connectionString) ? { rejectUnauthorized: false } : undefined,
  });

  pool.on("error", (error) => {
    console.error("[db] idle client error", error);
  });

  globalForPool.__elelPgPool = pool;
  return pool;
}

let schemaReady: Promise<void> | null = null;

export async function ensureSchema(): Promise<void> {
  const pool = getPool();
  if (!pool) return;

  if (!schemaReady) {
    schemaReady = pool
      .query(
        `CREATE TABLE IF NOT EXISTS cms_document (
           id TEXT PRIMARY KEY,
           data JSONB NOT NULL,
           updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
         )`,
      )
      .then(() => undefined)
      .catch((error) => {
        schemaReady = null;
        throw error;
      });
  }

  return schemaReady;
}
