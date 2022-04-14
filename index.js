const got = require('got');
const fs = require("fs");
const {
    execSync
} = require("child_process");
const path = "./Minecraft/CraftBukkit.jar";
const nngrok = "./ngrok-stable-linux-amd64.tgz"

if (!fs.existsSync("./Minecraft")) fs.mkdirSync("./Minecraft");

const ngrok = () => {
    if (fs.existsSync("./ngrok")) return console.log("\x1b[32m%s\x1b[0m", "Ngrok already installed!");

    else if (!fs.existsSync("./ngrok")) {
        console.log("\x1b[31m%s\x1b[0m", "Ngrok not found!")
        console.log("\x1b[31m%s\x1b[0m", "Downloading one for you")
        got.stream("https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.tgz")
            .pipe(fs.createWriteStream(nngrok))
            .on("finish", () => {
                console.log("\x1b[32m%s\x1b[0m", "Ngrok downloaded!");
                execSync("tar xvzf ngrok-stable-linux-amd64.tgz && rm ngrok-stable-linux-amd64.tgz", {
                    stdio: "inherit"
                });
            });
    }
}

const server = () => {
    if (fs.existsSync(path)) {
        execSync("cd Minecraft && java -Xmx1024M -Xms1024M -jar CraftBukkit.jar", {
            stdio: "inherit"
        });
    } else if (!fs.existsSync(path)) {
        console.log("\x1b[31m%s\x1b[0m", "CraftBukkit.jar not found!");
        console.log("\x1b[34m%s\x1b[0m", "I will try to download one for you.");
        console.log("\x1b[34m%s\x1b[0m", "If for whatever reason it says that the Jar file is corrupt, you can delete the jar file and try running this again.");

        // Create the Minecraft folder if it doesn't exist

        got.stream("https://cdn.getbukkit.org/craftbukkit/craftbukkit-1.8.8-R0.1-SNAPSHOT-latest.jar")
            .pipe(fs.createWriteStream(path))
            .on("finish", () => {
                console.log("\x1b[32m%s\x1b[0m", "CraftBukkit.jar downloaded!");
                execSync("cd Minecraft && java -Xmx1024M -Xms1024M -jar CraftBukkit.jar", {
                    stdio: "inherit"
                });
            });
    }
}

ngrok();
server();
