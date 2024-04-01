const fs = require("fs");
const ngrok = require("ngrok");
const { execSync } = require("child_process");
const config = require("../config/config.json");

const minecraftFolderPath = "Minecraft";

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

  fs.readFile("./src/config/javaArgs.txt", "utf8", (err, data) => {
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

module.exports = startServer;
