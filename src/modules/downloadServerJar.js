const fs = require("fs");
const got = require("got");

const acceptEula = require("./acceptEula");
const startServer = require("./startServer");

const minecraftFolderPath = "Minecraft";
const serverJarPath = `${minecraftFolderPath}/server.jar`;

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

module.exports = downloadServerJar;
