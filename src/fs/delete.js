import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const remove = async () => {
  const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
  const FILES_DIR = "files";
  const TARGET_FILENAME = "fileToRemove.txt";
  const TARGET_FILE = path.resolve(
    MODULE_DIRECTORY,
    FILES_DIR,
    TARGET_FILENAME
  );
  const ERROR_MESSAGE = "FS operation failed";

  try {
    await fsPromises.rm(TARGET_FILE);
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await remove();
