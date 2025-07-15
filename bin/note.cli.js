#!/usr/bin/env node

import { argv } from "node:process";
import { addNote } from "../src/core/add.js";
import { listNotes } from "../src/core/list.js";
import { deleteNote } from "../src/core/delete.js";

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
    break;
  default:
    console.log(`❓ Unknown command: ${command}`);
    console.log(`🧠 Try:
    boost add "Title" "Description"
    boost list
    boost delete <index>`);
};
