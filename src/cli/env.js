const RSS_PREFIX = "RSS_";
const JOIN_SEPARATOR = "; ";

const parseEnv = () => {
  const rssVars = [];

  for (const [envName, envValue] of Object.entries(process.env)) {
    if (envName.startsWith(RSS_PREFIX)) {
      rssVars.push(`${envName}=${envValue}`);
    }
  }

  console.log(rssVars.join(JOIN_SEPARATOR));
};

parseEnv();
