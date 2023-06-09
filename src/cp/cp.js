import { fork } from "node:child_process";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
const FILES_DIR = "files";
const SCRIPT_FILENAME = "script.js";
const SCRIPT_PATH = path.resolve(MODULE_DIRECTORY, FILES_DIR, SCRIPT_FILENAME);

const spawnChildProcess = async (args) => {
  const child = fork(SCRIPT_PATH, args);

  child.on("error", (err) => {
    console.error(`An error occured: ${err}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess([42, "foo", { id: 1 }]);
