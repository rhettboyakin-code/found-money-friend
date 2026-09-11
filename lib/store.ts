import fs from "fs";
import path from "path";
import type { AppState } from "./types";

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "db.json");
const seedPath = path.join(dataDir, "seed.json");

function ensureDb() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(dbPath)) {
    fs.copyFileSync(seedPath, dbPath);
  }
}

export function readState(): AppState {
  ensureDb();
  const raw = fs.readFileSync(dbPath, "utf8");
  return JSON.parse(raw) as AppState;
}

export function writeState(state: AppState) {
  ensureDb();
  const tmp = `${dbPath}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
  fs.renameSync(tmp, dbPath);
}

export function resetState(): AppState {
  fs.copyFileSync(seedPath, dbPath);
  return readState();
}
