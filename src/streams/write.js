import { once } from "node:events";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
const FILES_DIR = "files";
const FILENAME = "fileToWrite.txt";
const FILE = path.resolve(MODULE_DIRECTORY, FILES_DIR, FILENAME);
const ERROR_MESSAGE = "FS operation failed";

const write = async () => {
  try {
    const fh = await fsPromises.open(FILE, "w");
    const ws = fh.createWriteStream();
    const stream = process.stdin.pipe(ws);

    await once(stream, "finish");
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await write();
