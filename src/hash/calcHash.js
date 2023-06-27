import crypto from "node:crypto";
import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
const FILES_DIR = "files";
const FILENAME = "fileToCalculateHashFor.txt";
const FILEPATH = path.resolve(MODULE_DIRECTORY, FILES_DIR, FILENAME);
const ERROR_MESSAGE = "FS operation failed";

const getReadStreamFromFile = async (path) => {
  try {
    const fh = await fsPromises.open(path);

    return fh.createReadStream();
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

const calculateHash = async () => {
  const hash = crypto.createHash("sha256");
  const input = await getReadStreamFromFile(FILEPATH);

  input.on("readable", () => {
    const data = input.read();

    if (data) {
      hash.update(data);
    } else {
      console.log(`${hash.digest("hex")}`);
    }
  });
};

await calculateHash();
