import { pipeline, Transform } from "node:stream";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedStr = chunk
        .toString()
        .trimEnd()
        .split("")
        .reverse("")
        .join("");

      callback(null, `${reversedStr}\n`);
    },
  });

  pipeline(process.stdin, reverseTransform, process.stdout, (err) => {
    console.error(`Error: ${err}`);
  });
};

await transform();
