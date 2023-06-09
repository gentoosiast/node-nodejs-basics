import fsPromises from "node:fs/promises";
import path from "node:path";
import { getModuleDirectory } from "../utils/fs.js";

const copy = async () => {
  const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
  const SRC_DIRECTORY_NAME = "files";
  const DEST_DIRECTORY_NAME = "files_copy";
  const SRC_DIRECTORY = path.resolve(MODULE_DIRECTORY, SRC_DIRECTORY_NAME);
  const DEST_DIRECTORY = path.resolve(MODULE_DIRECTORY, DEST_DIRECTORY_NAME);
  const ERROR_MESSAGE = "FS operation failed";

  try {
    const [dirEnts] = await Promise.all([
      fsPromises.readdir(SRC_DIRECTORY, {
        withFileTypes: true,
      }),
      fsPromises.mkdir(DEST_DIRECTORY),
    ]);

    const copyPromises = dirEnts
      .filter((dirEnt) => dirEnt.isFile())
      .map((dirEnt) =>
        fsPromises.copyFile(
          path.resolve(SRC_DIRECTORY, dirEnt.name),
          path.resolve(DEST_DIRECTORY, dirEnt.name),
          fsPromises.constants.COPYFILE_EXCL
        )
      );

    await Promise.all(copyPromises);
  } catch {
    throw Error(ERROR_MESSAGE);
  }
};

await copy();
