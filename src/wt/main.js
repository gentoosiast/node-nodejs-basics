import os from "node:os";
import path from "node:path";
import { Worker } from "node:worker_threads";
import { getModuleDirectory } from "../utils/fs.js";

const MODULE_DIRECTORY = getModuleDirectory(import.meta.url);
const WORKER_FILENAME = "worker.js";
const WORKER_FILEPATH = path.resolve(MODULE_DIRECTORY, WORKER_FILENAME);
const STARTING_NUMBER = 10;
const STATUS = {
  OK: "resolved",
  ERROR: "error",
};

const createWorker = async (workerPath, workerData) => {
  return new Promise((res) => {
    const worker = new Worker(workerPath, { workerData });

    worker.on("message", (result) => {
      res(result);
    });

    worker.on("error", () => {
      res(null);
    });

    worker.on("messageerror", () => {
      res(null);
    });
  });
};

const performCalculations = async () => {
  const numCores = os.availableParallelism();
  const workers = new Array(numCores);

  for (let i = 0; i < numCores; i++) {
    workers[i] = createWorker(WORKER_FILEPATH, STARTING_NUMBER + i);
  }

  const results = (await Promise.all(workers)).map((result) =>
    result !== null
      ? { status: STATUS.OK, data: result }
      : { status: STATUS.ERROR, data: result }
  );

  console.log(results);
};

await performCalculations();
