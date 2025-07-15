import { getDB } from "../utils/db.js";
import chalk from "chalk";

export async function markDone(index) {
  const db = await getDB();

  const note = db.data.notes[index - 1];

  if (!note) {
    console.log(chalk.red(`❌ No note found at index ${index}`));
    return;
  }

  if (note.done) {
    console.log(chalk.gray(`🔁 Note #${index} is already marked as done.`));
    return;
  }

  note.done = true;
  await db.write();

  console.log(chalk.green(`✅ Note #${index} marked as done!`));
}
