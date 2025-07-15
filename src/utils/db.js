import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const adapter = new JSONFile('db.json');
const db = new Low(adapter);

export async function getDB() {
  await db.read();
  db.data ||= { notes: [] };
  return db;
}
