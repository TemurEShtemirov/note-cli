import { getDB } from "../utils/db.js";
import inquirer from "inquirer";
import chalk from "chalk";

export async function editNote(index) {
  const db = await getDB();

  const note = db.data.notes[index - 1];

  if (!note) {
    console.log(chalk.red(`❌ No note found at index ${index}`));
    return;
  }

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: `📝 New title (current: "${note.title}")`,
      default: note.title,
    },
    {
      type: "input",
      name: "description",
      message: `🧾 New description (current: "${note.description}")`,
      default: note.description,
    },
  ]);

  note.title = answers.title;
  note.description = answers.description;

  await db.write();

  console.log(chalk.green(`✅ Note #${index} updated!`));
}
