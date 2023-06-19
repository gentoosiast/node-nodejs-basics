import { pipeline, Transform } from "node:stream";
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

  await pipeline(process.stdin, reverseTransform, process.stdout, (err) => {
    if (err) {
      console.error(`An error occured: ${err}`);
      process.exitCode = 1;
    }
  });
};

await transform();
