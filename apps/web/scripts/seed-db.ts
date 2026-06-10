/**
 * Seeds (or re-seeds) the Neon/Postgres database with the bundled CMS document.
 *
 *   DATABASE_URL=postgres://... npm run db:seed            # seed only if empty
 *   DATABASE_URL=postgres://... npm run db:seed -- --force # overwrite existing
 *
 * The whole CMS store is kept as a single JSONB document so the application's
 * merit/upsert logic stays unchanged.
 */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Pool } from "pg";

const DOCUMENT_ID = "primary";
const here = path.dirname(fileURLToPath(import.meta.url));
const seedPath = path.join(here, "..", "src", "data", "cms-seed.json");

async function main() {
  const connectionString = process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    console.error("DATABASE_URL is not set. Add your Neon connection string and retry.");
    process.exit(1);
  }

  const force = process.argv.includes("--force");
  const seed = JSON.parse(await readFile(seedPath, "utf8"));

  const useSsl = !/sslmode=disable/i.test(connectionString) && !/localhost|127\.0\.0\.1/i.test(connectionString);
  const pool = new Pool({
    connectionString,
    ssl: useSsl ? { rejectUnauthorized: false } : undefined,
  });

  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS cms_document (
         id TEXT PRIMARY KEY,
         data JSONB NOT NULL,
         updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
       )`,
    );

    const existing = await pool.query("SELECT id FROM cms_document WHERE id = $1", [DOCUMENT_ID]);
    if (existing.rows.length > 0 && !force) {
      console.log("CMS document already exists. Re-run with -- --force to overwrite.");
      return;
    }

    await pool.query(
      `INSERT INTO cms_document (id, data, updated_at)
       VALUES ($1, $2::jsonb, now())
       ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data, updated_at = now()`,
      [DOCUMENT_ID, JSON.stringify(seed)],
    );

    console.log(force ? "CMS document overwritten from seed." : "CMS document seeded.");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
