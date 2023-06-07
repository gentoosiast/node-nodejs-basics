import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const read = async () => {
  const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
  const FILES_DIR = "files";
  const FILENAME = "fileToRead.txt";
  const FILE = path.resolve(MODULE_DIRECTORY, FILES_DIR, FILENAME);
  const ERROR_MESSAGE = "FS operation failed";

  try {
    const fh = await fsPromises.open(FILE);
    const rs = fh.createReadStream();
    rs.pipe(process.stdout);
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await read();
