import { dirname } from "node:path";
import { fileURLToPath } from "url";

export const getModuleFilename = (fileURL) => {
  return fileURLToPath(fileURL);
};

export const getModuleDirectory = (fileURL) => {
  return dirname(getModuleFilename(fileURL));
};
