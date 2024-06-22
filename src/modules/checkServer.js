const fs = require("fs");
const path = require("path");

const config = require("../config/config.json");

const startServer = require("./startServer");
const downloadServerJar = require("./downloadServerJar");

const availableSoftwares = [
  "paper",
  "purpur",
  "vanilla",
  "mohist",
  "fabric",
  "banner",
  "quilt",
];

const {
  Paper,
  Mohist,
  Vanilla,
  Purpur,
  Fabric,
  Banner,
  Quilt,
} = require("./softwares/index");

const minecraftFolderPath = "Minecraft";
const serverJarPath = path.join(minecraftFolderPath, "server.jar");

if (!fs.existsSync(minecraftFolderPath)) {
  fs.mkdirSync(minecraftFolderPath);
}

const checkServer = async () => {
  if (fs.existsSync(serverJarPath)) {
    startServer();
  } else {
    const software = config.software.toLowerCase();
    if (!availableSoftwares.includes(software)) {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "The software you provided does not exist!",
      );
      return;
    }

    const softwareVersions = {
      paper: Paper,
      purpur: Purpur,
      vanilla: Vanilla,
      mohist: Mohist,
      fabric: Fabric,
      banner: Banner,
      quilt: Quilt,
    };

    const url = await softwareVersions[software](config.version);

    console.log("\x1b[31m%s\x1b[0m", "server.jar not found!");
    console.log("\x1b[34m%s\x1b[0m", "I will try to download one for you.");
    console.log(
      "\x1b[34m%s\x1b[0m",
      "If for whatever reason it says that the Jar file is corrupt, you can delete the jar file and try running this again.",
    );

    downloadServerJar(url, software);
  }
};

module.exports = checkServer;
