import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
const FILES_DIRECTORY = "files";
const WRONG_FILENAME = "wrongFilename.txt";
const PROPER_FILENAME = "properFilename.md";
const WRONG_FILE = path.resolve(
  MODULE_DIRECTORY,
  FILES_DIRECTORY,
  WRONG_FILENAME
);
const PROPER_FILE = path.resolve(
  MODULE_DIRECTORY,
  FILES_DIRECTORY,
  PROPER_FILENAME
);
const ERROR_MESSAGE = "FS operation failed";

const isFileExists = async (path) => {
  try {
    await fsPromises.access(path);
    return true;
  } catch {
    return false;
  }
};

const rename = async () => {
  try {
    const isDestFileExists = await isFileExists(PROPER_FILE);
    if (isDestFileExists) {
      throw new Error();
    }

    await fsPromises.rename(WRONG_FILE, PROPER_FILE);
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await rename();
