import { spawn } from "node:child_process";
import { pipeline } from "node:stream";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
const FILES_DIR = "files";
const EXEC_COMMAND = "node";
const SCRIPT_FILENAME = "script.js";
const SCRIPT_PATH = path.resolve(MODULE_DIRECTORY, FILES_DIR, SCRIPT_FILENAME);

const handleError = (err) => {
  if (err) {
    console.error(`An error occured: ${err}`);
    process.exitCode = 1;
  }
};

const spawnChildProcess = async (args) => {
  const child = spawn(EXEC_COMMAND, [SCRIPT_PATH, ...args]);

  pipeline(process.stdin, child.stdin, handleError);
  pipeline(child.stdout, process.stdout, handleError);
};

// Put your arguments in function call to test this functionality
spawnChildProcess([42, "foo", 28, "bar"]);
