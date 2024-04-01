const fs = require("fs");
const getPaper = require("./getPaper");
const config = require("../config/config.json");

const startServer = require("./startServer");
const downloadServerJar = require("./downloadServerJar");

const availableSoftwares = ["paper", "purpur", "vanilla", "sponge"];

const minecraftFolderPath = "Minecraft";
const serverJarPath = `${minecraftFolderPath}/server.jar`;

// if Minecraft folder dont exist, create it
if (!fs.existsSync(minecraftFolderPath)) fs.mkdirSync(minecraftFolderPath);

// A function :D
const checkServer = async () => {
  if (fs.existsSync(serverJarPath)) {
    startServer();
  } else {
    if (!availableSoftwares.includes(config.software.toLowerCase())) {
      return console.log(
        "\x1b[31m%s\x1b[0m",
        "The software you provided does not exist!", // This is a message? ;p
      );
    }
    // Minecraft server software Apis
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

    // MoRe ThInGs ;s
    console.log("\x1b[31m%s\x1b[0m", "server.jar not found!");
    console.log("\x1b[34m%s\x1b[0m", "I will try to download one for you.");
    console.log(
      "\x1b[34m%s\x1b[0m",
      "If for whatever reason it says that the Jar file is corrupt, you can delete the jar file and try running this again.",
    );

    downloadServerJar(url[config.software]);
  }
};

module.exports = checkServer;
