import { getDB } from "../utils/db.js";
import chalk from "chalk";

export async function listNotes() {
  const db = await getDB();
  if (db.data.notes.length === 0) {
    console.log(chalk.gray("📭 No notes yet."));
    return;
  }

  db.data.notes.forEach((note, i) => {
    console.log(
      `${chalk.yellow(i + 1)}. ${chalk.bold(note.title)}\n   ${
        note.description
      }`
    );
  });
}
