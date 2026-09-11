import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataDir = path.join(root, "data");
const seedPath = path.join(dataDir, "seed.json");
const dbPath = path.join(dataDir, "db.json");

if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(seedPath)) {
  console.error("Missing data/seed.json");
  process.exit(1);
}
fs.copyFileSync(seedPath, dbPath);
console.log("Seeded Northgate HVAC demo → data/db.json");
