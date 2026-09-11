import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedPath = path.join(root, "data", "seed.json");
const dbPath = path.join(root, "data", "db.json");

fs.copyFileSync(seedPath, dbPath);
console.log("Reset Northgate HVAC demo → data/db.json");
