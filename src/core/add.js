import { getDB } from "../utils/db.js";
import chalk from "chalk";

export async function addNote(title, description) {
  if (!title || !description) {
    console.log(chalk.red("⚠️  Please provide title and description"));
    return;
  }

  const db = await getDB();
  db.data.notes.push({ title, description });
  await db.write();

  console.log(chalk.green("✅ Note added successfully!"));
}
