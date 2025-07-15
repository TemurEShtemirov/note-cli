import fs from "fs";
import chalk from "chalk";

const configPath = new URL("../../config.json", import.meta.url);

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch (err) {
    return {};
  }
}

export async function handleConfig(action, key, value) {
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(configPath, "{}");
  }

  const rawData = fs.readFileSync(configPath, "utf-8") || "{}";
  const config = safeParse(rawData); // 🔐 safe parse, no crash

  if (action === "set") {
    config[key] = value === "true" ? true : value === "false" ? false : value;
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    console.log(chalk.green(`✅ Config updated: ${key} = ${value}`));
  } else if (action === "get") {
    const val = config[key];
    console.log(
      val !== undefined
        ? chalk.blue(`🔧 ${key} = ${val}`)
        : chalk.gray(`❌ Key "${key}" not found.`)
    );
  } else {
    console.log(
      chalk.yellow(
        "🧠 Usage:\n boost config set <key> <value>\n boost config get <key>"
      )
    );
  }
}
