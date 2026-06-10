// Generates an ADMIN_PASSWORD_HASH value for the .env / Vercel environment.
//   node apps/web/scripts/hash-password.mjs "YourStrongPassw0rd!"
import crypto from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "your-password"');
  process.exit(1);
}

if (password.length < 12) {
  console.error("Use at least 12 characters for a production admin password.");
  process.exit(1);
}

const salt = crypto.randomBytes(18).toString("base64url");
const iterations = 210000;
const hash = crypto.pbkdf2Sync(password, salt, iterations, 32, "sha256").toString("base64url");

console.log(`pbkdf2$${iterations}$${salt}$${hash}`);
