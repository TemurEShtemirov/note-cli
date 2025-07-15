import { getDB } from "../utils/db.js";
import chalk from "chalk";
import Table from "cli-table3";

export async function showStats() {
  const db = await getDB();
  const notes = db.data.notes;

  const total = notes.length;
  const done = notes.filter((n) => n.done).length;
  const pending = total - done;

  const taggedNotes = notes.filter((n) => n.tags?.length);
  const totalTags = taggedNotes.reduce((acc, n) => acc + n.tags.length, 0);

  const statsTable = new Table({
    head: [chalk.cyan("Metric"), chalk.green("Value")],
    colWidths: [25, 15],
  });

  statsTable.push(
    ["📁 Total Notes", chalk.yellow(total)],
    ["✅ Done", chalk.green(done)],
    ["🕒 Pending", chalk.red(pending)],
    ["🏷️ Tagged Notes", chalk.magenta(taggedNotes.length)],
    ["🔖 Total Tags Used", chalk.cyan(totalTags)]
  );

  console.log(chalk.bold.underline("\n📊 Boost CLI Stats"));
  console.log(statsTable.toString());
}
