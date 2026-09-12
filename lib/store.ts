import fs from "fs";
import path from "path";
import type { AppState } from "./types";

/**
 * On Vercel/serverless the app bundle is read-only (EROFS).
 * Seed stays in the package; the working db lives under /tmp.
 * Locally we keep using data/db.json so npm scripts still work.
 */
const seedPath = path.join(process.cwd(), "data", "seed.json");

function writableDir(): string {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join("/tmp", "revenue-bloom");
  }
  return path.join(process.cwd(), "data");
}

function dbPath(): string {
  return path.join(writableDir(), "db.json");
}

function ensureDb() {
  const dir = writableDir();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const dest = dbPath();
  if (!fs.existsSync(dest)) {
    fs.copyFileSync(seedPath, dest);
  }
}

export function readState(): AppState {
  ensureDb();
  const raw = fs.readFileSync(dbPath(), "utf8");
  return JSON.parse(raw) as AppState;
}

export function writeState(state: AppState) {
  ensureDb();
  const dest = dbPath();
  const tmp = `${dest}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, dest);
}

export function resetState(): AppState {
  const dir = writableDir();
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(seedPath, dbPath());
  return readState();
}
