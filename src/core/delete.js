import { getDB } from "../utils/db.js";
import chalk from "chalk";

export async function deleteNote(index) {
  const db = await getDB();
  if (!index || index < 1 || index > db.data.notes.length) {
    console.log(chalk.red("⚠️  Invalid index"));
    return;
  }

  const [removed] = db.data.notes.splice(index - 1, 1);
  await db.write();

  console.log(chalk.green(`🗑️  Removed: "${removed.title}"`));
}
