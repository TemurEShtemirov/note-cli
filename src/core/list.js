import { getDB } from "../utils/db.js";
import chalk from "chalk";
import Table from "cli-table3";

export async function listNotes() {
  const db = await getDB();
  const notes = db.data.notes;

  if (!notes.length) {
    console.log(chalk.gray("📭 No notes found."));
    return;
  }

  const table = new Table({
    head: [
      chalk.cyan("#"),
      chalk.blue("Title"),
      chalk.yellow("Description"),
      chalk.green("Status"),
      chalk.magenta("Tags"),
    ],
    colWidths: [5, 20, 40, 10, 25],
  });

  notes.forEach((note, index) => {
    table.push([
      index + 1,
      chalk.bold(note.title),
      note.description || "",
      note.done ? chalk.green("✅") : chalk.yellow("🕒"),
      note.tags?.length ? note.tags.join(", ") : chalk.gray("—"),
    ]);
  });

  console.log(table.toString());
}
