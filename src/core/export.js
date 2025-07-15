import { getDB } from '../utils/db.js';
import fs from 'fs';
import chalk from 'chalk';

export async function exportNotes(format) {
  const db = await getDB();
  const notes = db.data.notes;

  if (!notes.length) {
    console.log(chalk.gray("📭 No notes to export."));
    return;
  }

  const filename = `notes-export.${format}`;

  let output;

  switch (format) {
    case 'json':
      output = JSON.stringify(notes, null, 2);
      break;

    case 'txt':
      output = notes.map((n, i) =>
        `${i + 1}. ${n.title}\n${n.description}\n${n.done ? '[DONE]' : ''}\n---`
      ).join('\n');
      break;

    case 'md':
      output = notes.map((n, i) =>
        `### ${i + 1}. ${n.title} ${n.done ? '✅' : ''}\n\n${n.description}\n\n${
          n.tags?.length ? `**Tags:** ${n.tags.join(', ')}` : ''
        }\n\n---`
      ).join('\n');
      break;

    default:
      console.log(chalk.red("❌ Unknown format. Use: json, txt, md"));
      return;
  }

  fs.writeFileSync(filename, output);
  console.log(chalk.green(`📁 Exported to ${filename}`));
}
