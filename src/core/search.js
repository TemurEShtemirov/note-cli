import { getDB } from "../utils/db.js";
import chalk from "chalk";

export async function searchNotes(query) {
  const db = await getDB();

  if (!query) {
    console.log(chalk.red("❌ Please enter a keyword to search."));
    return;
  }

  const q = query.toLowerCase();

  const matches = db.data.notes.filter((note) => {
    const inTitle = note.title?.toLowerCase().includes(q);
    const inDesc = note.description?.toLowerCase().includes(q);
    const inTags = note.tags?.some((tag) => tag.toLowerCase().includes(q));

    return inTitle || inDesc || inTags;
  });

  if (!matches.length) {
    console.log(chalk.gray(`😶 No matches found for "${query}"`));
    return;
  }

  console.log(
    chalk.green(`🔍 Found ${matches.length} result(s) for "${query}":\n`)
  );
  matches.forEach((note, i) => {
    const doneMark = note.done ? chalk.green("✅") : chalk.yellow("🕒");
    const tags = note.tags?.length
      ? chalk.cyan(`[${note.tags.join(", ")}]`)
      : "";

    console.log(`${doneMark} ${chalk.bold(note.title)} ${tags}
   ${note.description}\n`);
  });
}
