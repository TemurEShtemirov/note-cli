import { getDB } from "../utils/db.js";
import chalk from "chalk";

export async function listNotes() {
  const db = await getDB();

  if (!db.data.notes.length) {
    console.log(chalk.gray("📭 No notes yet."));
    return;
  }

db.data.notes.forEach((note, i) => {
  const doneMark = note.done ? chalk.green("✅") : chalk.yellow("🕒");
  const tags = note.tags?.length ? chalk.cyan(`[${note.tags.join(", ")}]`) : "";

  console.log(`${doneMark} ${chalk.yellow(i + 1)}. ${chalk.bold(note.title)} ${tags}
   ${note.description}`);
});

}
