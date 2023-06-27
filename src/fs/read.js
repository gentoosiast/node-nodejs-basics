import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
const FILES_DIR = "files";
const FILENAME = "fileToRead.txt";
const FILEPATH = path.resolve(MODULE_DIRECTORY, FILES_DIR, FILENAME);
const ERROR_MESSAGE = "FS operation failed";

const read = async () => {
  try {
    const fileContents = await fsPromises.readFile(FILEPATH, {
      encoding: "utf8",
    });

    console.log(fileContents);
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await read();
