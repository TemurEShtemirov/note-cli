import fs from "fs";
import chalk from "chalk";
import { getDB } from "../utils/db.js";
import dotenv from "dotenv";
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

async function callGemini(messages) {
  const res = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ role: "user", parts: messages }] }),
  });
  const data = await res.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "[No response from Gemini]"
  );
}

export async function aiSummary() {
  const db = await getDB();
  const notes = db.data.notes;

  if (!notes.length)
    return console.log(chalk.gray("📭 No notes to summarize."));

  const textBlob = notes
    .map((n, i) => `${i + 1}. ${n.title}: ${n.description}`)
    .join("\n");
  const prompt = `Summarize this list of tasks in a helpful, concise way:\n${textBlob}`;

  const response = await callGemini([{ text: prompt }]);
  console.log(chalk.cyan("\n🧠 AI Summary:"));
  console.log(response);
}

export async function aiGenerate(titlePrompt) {
  const db = await getDB();
  const fakeDescription = `Auto-generated task for: ${titlePrompt}`;
  db.data.notes.push({
    title: titlePrompt,
    description: fakeDescription,
    done: false,
    tags: [],
  });
  await db.write();
  console.log(chalk.green(`✅ AI generated and added: ${titlePrompt}`));
}

export async function aiChat(input) {
  const db = await getDB();
  const notes = db.data.notes;
  const context = notes.map((n) => `${n.title}: ${n.description}`).join("\n");

  const prompt = `Here are my notes:\n${context}\n\nRespond to this message using that context:\n${input}`;
  const response = await callGemini([{ text: prompt }]);

  console.log(chalk.magenta("\n🤖 AI Response:"));
  console.log(response);
}
