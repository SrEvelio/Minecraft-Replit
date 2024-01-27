const config = require("./config/config.json");
const { execSync } = require("child_process");

const got = require("got");
const fs = require("fs");
const ngrok = require("ngrok");

const minecraftFolderPath = "Minecraft";
const serverJarPath = `${minecraftFolderPath}/server.jar`;
const availableSoftwares = ["paper", "purpur", "vanilla", "sponge"];

if (!fs.existsSync(minecraftFolderPath)) fs.mkdirSync(minecraftFolderPath);

const checkServer = async () => {
  if (fs.existsSync(serverJarPath)) {
    startServer();
  } else {
    if (!availableSoftwares.includes(config.software.toLowerCase())) {
      return console.log(
        "\x1b[31m%s\x1b[0m",
        "The software you provided does not exist!",
      );
    }
    let purpurUrl = `https://api.purpurmc.org/v2/purpur/${config.version}/latest/download`;
    let paperUrl = await getPaper(config.version);
    let vanillaUrl = `https://www.mcjars.com/get/vanilla-${config.version}.jar`;
    let spongeUrl = `https://serverjars.com/api/fetchJar/servers/sponge/${config.version}`;

    let url = {
      paper: paperUrl,
      purpur: purpurUrl,
      vanilla: vanillaUrl,
      sponge: spongeUrl,
    };

    console.log("\x1b[31m%s\x1b[0m", "server.jar not found!");
    console.log("\x1b[34m%s\x1b[0m", "I will try to download one for you.");
    console.log(
      "\x1b[34m%s\x1b[0m",
      "If for whatever reason it says that the Jar file is corrupt, you can delete the jar file and try running this again.",
    );

    downloadServerJar(url[config.software]);
  }
};

// A simple function to download the software
const downloadServerJar = (downloadUrl) => {
  got
    .stream(downloadUrl)
    .on("error", (err) => {
      console.error(err);
      console.log(
        "\x1b[31m%s\x1b[0m",
        "An error occurred while downloading the selected version, maybe it does not exist?",
      );
    })
    .pipe(fs.createWriteStream(serverJarPath))
    .on("finish", () => {
      console.log("\x1b[32m%s\x1b[0m", "server.jar downloaded!");
      acceptEula();
      startServer();
    });
};

// The name says it all
const getPaper = async (version) => {
  const baseUrl = "https://papermc.io/api/v2/projects/paper/versions";

  try {
    let res = await got(`${baseUrl}/${version}`);
    let body = JSON.parse(res.body);

    const latestBuild = body.builds[body.builds.length - 1];
    const jarFileName = `paper-${version}-${latestBuild}.jar`;

    return `${baseUrl}/${version}/builds/${latestBuild}/downloads/${jarFileName}`;
  } catch (err) {
    return null;
  }
};

// Automatically accept the EULA
const acceptEula = async () => {
  fs.writeFile(`${minecraftFolderPath}/eula.txt`, "eula=true", (err) => {
    if (err) throw err;
  });
};

// Function to start the Minecraft server
const startServer = async () => {
  url = await ngrok.connect({
    authtoken: process.env.authtoken,
    region: config.ngrokregion,
    proto: "tcp",
    addr: 25565,
  });

  console.log("\x1b[36m%s\x1b[0m", "Starting Minecraft server...");
  console.log(
    "\x1b[32m%s\x1b[0m",
    `Server IP: ${url.replace(/^tcp:\/\//, "")}`,
  );
  console.log("\n");

  fs.readFile("./config/javaArgs.txt", "utf8", (err, data) => {
    if (err) return console.log("\x1b[31m%s\x1b[0m", "javaArgs.txt not found!");

    let commonJavaOptions = data.trim().split("\n");

    execSync(
      `cd ${minecraftFolderPath} && java ${commonJavaOptions.join(
        " ",
      )} -jar server.jar nogui`,
      { stdio: "inherit" },
    );
  });
};

checkServer();