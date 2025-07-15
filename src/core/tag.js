import { getDB } from "../utils/db.js";
import chalk from "chalk";

export async function addTag(index, tag) {
  if (!tag) {
    console.log(chalk.red("❌ No tag provided."));
    return;
  }

  const db = await getDB();
  const note = db.data.notes[index - 1];

  if (!note) {
    console.log(chalk.red(`❌ No note found at index ${index}`));
    return;
  }

  note.tags ||= [];

  if (note.tags.includes(tag)) {
    console.log(
      chalk.yellow(`⚠️ Tag "${tag}" already exists for note #${index}`)
    );
    return;
  }

  note.tags.push(tag);
  await db.write();

  console.log(chalk.green(`🏷️ Tag "${tag}" added to note #${index}`));
}
