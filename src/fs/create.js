import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const create = async () => {
  const FILES_DIR = "files";
  const FILE_NAME = "fresh.txt";
  const FILE_PATH = path.resolve(
    getModuleDirectory(import.meta.url),
    FILES_DIR,
    FILE_NAME
  );
  const FILE_CONTENTS = "I am fresh and young";
  const ERROR_MESSAGE = "FS operation failed";

  try {
    await fsPromises.writeFile(FILE_PATH, FILE_CONTENTS, { flag: "wx" });
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await create();
