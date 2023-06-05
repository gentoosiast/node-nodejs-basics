import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const getModuleFilename = (fileURL) => {
  return fileURLToPath(fileURL);
};

export const getModuleDirectory = (fileURL) => {
  return dirname(getModuleFilename(fileURL));
};
