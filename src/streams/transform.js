import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import os from "node:os";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedStr = chunk
        .toString()
        .trimEnd()
        .split("")
        .reverse("")
        .join("");

      callback(null, `${reversedStr}${os.EOL}`);
    },
  });

  try {
    await pipeline(process.stdin, reverseTransform, process.stdout);
  } catch (err) {
    console.error(`An error occured: ${err}`);
    process.exitCode = 1;
  }
};

await transform();
