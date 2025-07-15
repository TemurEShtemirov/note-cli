#!/usr/bin/env node

import { argv } from "node:process";
import { addNote } from "../src/core/add.js";
import { listNotes } from "../src/core/list.js";
import { deleteNote } from "../src/core/delete.js";

// grab the command and arguments
const [, , command, ...args] = argv;

switch (command) {
  case "add":
    addNote(args[0], args[1]);
    break;

  case "list":
    listNotes();
    break;

  case "delete":
    deleteNote(Number(args[0]));
    break; // ✅ you forgot this before

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

  default:
    console.log(`❓ Unknown command: ${command}`);
    console.log(`🧠 Try:
    boost add "Title" "Description"
    boost list
    boost delete <index>
    boost edit <index>`);
}
