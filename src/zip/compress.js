import fsPromises from "node:fs/promises";
import path from "node:path";
import { pipeline } from "node:stream";
import zlib from "node:zlib";
import { getModuleDirectory } from "../utils/fs.js";

const compress = async () => {
  const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
  const FILES_DIR = "files";
  const SRC_FILENAME = "fileToCompress.txt";
  const DEST_FILENAME = "archive.gz";
  const SRC_FILE = path.resolve(MODULE_DIRECTORY, FILES_DIR, SRC_FILENAME);
  const DEST_FILE = path.resolve(MODULE_DIRECTORY, FILES_DIR, DEST_FILENAME);
  const ERROR_MESSAGE = "FS operation failed";

  try {
    const srcFh = await fsPromises.open(SRC_FILE);
    const destFh = await fsPromises.open(DEST_FILE, "w");
    const rs = srcFh.createReadStream();
    const ws = destFh.createWriteStream();
    const gzip = zlib.createGzip();

    pipeline(rs, gzip, ws, (err) => {
      if (err) {
        console.error(`An error occured: ${err}`);
        process.exitCode = 1;
      }
    });
  } catch {
    throw new Error(ERROR_MESSAGE);
  }
};

await compress();
