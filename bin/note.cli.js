#!/usr/bin/env node

import { showWelcome } from "../src/ui/welcome.js";
import { argv } from "node:process";
import { addNote } from "../src/core/add.js";
import { listNotes } from "../src/core/list.js";
import { deleteNote } from "../src/core/delete.js";
import dotenv from "dotenv";
dotenv.config();

// grab the command and arguments
const [, , command, ...args] = argv;

await showWelcome();

switch (command) {
  case "help":
    console.log(`🧠 Boost CLI Help:
    - add "Title" "Description"
    - list
    - delete <index>
    - edit <index>
    - done <index>
    - tag <index> "tag1, tag2"
    - search "query"
    - stats
    - config <key> <value>
    - export <format>
    - ai summary
    - ai generate "task"
    - ai chat "message"`);
    break;

  case "version":
    console.log("Boost CLI v1.0.0");
    break;

  case "add":
    addNote(args[0], args[1]);
    break;

  case "list":
    listNotes();
    break;

  case "delete":
    deleteNote(Number(args[0]));
    break;

  case "edit":
    import("../src/core/edit.js").then(({ editNote }) => {
      editNote(Number(args[0]));
    });
    break;

  case "done":
    import("../src/core/done.js").then(({ markDone }) => {
      markDone(Number(args[0]));
    });
    break;

  case "tag":
    import("../src/core/tag.js").then(({ addTag }) => {
      addTag(Number(args[0]), args[1]);
    });
    break;

  case "search":
    import("../src/core/search.js").then(({ searchNotes }) => {
      searchNotes(args.join(" "));
    });
    break;

  case "stats":
    import("../src/core/stats.js").then(({ showStats }) => {
      showStats();
    });
    break;

  case "config":
    import("../src/core/config.js").then(({ handleConfig }) => {
      handleConfig(args[0], args[1], args[2]);
    });
    break;

  case "export":
    import("../src/core/export.js").then(({ exportNotes }) => {
      exportNotes(args[0]);
    });
    break;

  case "ai":
    switch (args[0]) {
      case "summary":
        import("../src/core/ai.js").then(({ aiSummary }) => aiSummary());
        break;
      case "generate":
        import("../src/core/ai.js").then(({ aiGenerate }) =>
          aiGenerate(args.slice(1).join(" "))
        );
        break;
      case "chat":
        import("../src/core/ai.js").then(({ aiChat }) =>
          aiChat(args.slice(1).join(" "))
        );
        break;
      default:
        console.log("🤖 Unknown AI sub-command. Try:");
        console.log("  boost ai summary");
        console.log("  boost ai generate 'New Task'");
        console.log("  boost ai chat 'Talk to your notes'");
    }
    break;

  default:
    console.log(`❓ Unknown command: ${command}`);
    console.log(`🧠 Try:
    boost add "Title" "Description"
    boost list
    boost delete <index>
    boost edit <index>
    boost ai summary|generate|chat`);
}
