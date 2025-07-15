import fs from "fs";
import chalk from "chalk";
import { getDB } from "../utils/db.js";
import fetch from "node-fetch";
import API_KEY from "../utils/config.js";

const GEMINI_API_KEY = API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

async function callGemini(messages) {
  try {
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
  } catch (err) {
    console.error("❌ Gemini API error:", err);
    return "[Gemini request failed]";
  }
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
const prompt = `You are a smart, conversational AI assistant helping the user stay focused and organized.

Here are the user's current notes (tasks, goals, ideas):
${context}

Now the user says: "${input}"

Instructions:
1. Greet the user warmly.
2. Analyze the user's notes. Identify:
   - Work priorities
   - Personal errands
   - Fun/leisure tasks
   - Patterns or themes (e.g., project work, planning)
3. Summarize what you observe about the user's mindset or goals.
4. Suggest 1-2 next best actions, clearly.
5. Ask a casual question to guide the user toward that action.

Be concise, friendly, and slightly witty if appropriate. Avoid repeating all the notes. Respond like a helpful teammate who actually cares.`;

  const response = await callGemini([{ text: prompt }]);

  console.log(chalk.magenta("\n🤖 AI Response:"));
  console.log(response);
}