import { once } from "node:events";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
const FILES_DIR = "files";
const FILENAME = "fileToRead.txt";
const FILE = path.resolve(MODULE_DIRECTORY, FILES_DIR, FILENAME);
const ERROR_MESSAGE = "FS operation failed";

const read = async () => {
  try {
    const fh = await fsPromises.open(FILE);
    const rs = fh.createReadStream();
    const stream = rs.pipe(process.stdout);

    await once(stream, "finish");
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await read();
