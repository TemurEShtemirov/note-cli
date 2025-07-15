import { getDB } from "../utils/db.js";
import chalk from "chalk";

export async function showStats() {
  const db = await getDB();
  const notes = db.data.notes;

  const total = notes.length;
  const done = notes.filter((n) => n.done).length;
  const pending = total - done;

  const taggedNotes = notes.filter((n) => n.tags?.length);
  const totalTags = taggedNotes.reduce(
    (acc, note) => acc + note.tags.length,
    0
  );

  console.log(chalk.blue.bold("\n📊 Boost CLI Stats\n"));

  console.log(`🗂️ Total notes: ${chalk.cyan(total)}`);
  console.log(`✅ Done: ${chalk.green(done)}`);
  console.log(`🕒 Pending: ${chalk.yellow(pending)}`);
  console.log(`🏷️ Tagged notes: ${chalk.magenta(taggedNotes.length)}`);
  console.log(`🔖 Total tags used: ${chalk.cyan(totalTags)}\n`);
}
