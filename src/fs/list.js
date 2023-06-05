import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const list = async () => {
  const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
  const FILES_DIR = "files";
  const FILES_DIR_PATH = path.resolve(MODULE_DIRECTORY, FILES_DIR);
  const ERROR_MESSAGE = "FS operation failed";

  try {
    const files = await fsPromises.readdir(FILES_DIR_PATH);

    for (const file of files) {
      console.log(file);
    }
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await list();
