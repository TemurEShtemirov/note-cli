import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

const adapter = new JSONFile("db.json");
const defaultData = { notes: [] };
const db = new Low(adapter, defaultData);

export async function getDB() {
  await db.read();
  db.data ||= defaultData; // still safe fallback
  return db;
}
