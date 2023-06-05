const parseArgs = () => {
  const JOIN_SEPARATOR = ", ";
  const args = process.argv.slice(2); // skip path to Node.js binary & path to executed script
  const props = [];

  let i = 0;

  while (i < args.length) {
    if (args[i].startsWith("--")) {
      props.push(`${args[i].replace(/^--/, "")} is ${args[i + 1]}`);
      i += 2;
    } else {
      i += 1;
    }
  }

  console.log(props.join(JOIN_SEPARATOR));
};

parseArgs();
