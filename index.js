const got = require('got');
const fs = require("fs");
const {
    execSync
} = require("child_process");
const path = "./Minecraft/paper-1.8.8-445.jar";
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

// Intall Hibernate Plugin (https://www.spigotmc.org/resources/hibernate.4441/)
const hibernateplugin = () => {
    if (fs.existsSync("./Minecraft/plugins/Hibernate-2.0.0.jar")) return;

    else if (!fs.existsSync("./Minecraft/plugins/Hibernate-2.0.0.jar")) {
        if (!fs.existsSync("./Minecraft/plugins")) fs.mkdirSync("./Minecraft/plugins");

        got.stream("https://www.mediafire.com/file/0rjr03550gi3ktw/Hibernate-2.0.0.jar/file")
            .pipe(fs.createWriteStream("./Minecraft/plugins/Hibernate-2.0.0.jar"))
            .on("finish", () => {
                console.log("\x1b[32m%s\x1b[0m", "Hibernate-2.0.0.jar downloaded!");
            });
    }
}

const server = () => {
    if (fs.existsSync(path)) {
        execSync("cd Minecraft && java -jar paper-1.8.8-445.jar", {
            stdio: "inherit"
        });
    } else if (!fs.existsSync(path)) {
        console.log("\x1b[31m%s\x1b[0m", "paper-1.8.8-445.jar not found!");
        console.log("\x1b[34m%s\x1b[0m", "I will try to download one for you.");
        console.log("\x1b[34m%s\x1b[0m", "If for whatever reason it says that the Jar file is corrupt, you can delete the jar file and try running this again.");

        // Create the Minecraft folder if it doesn't exist

        got.stream("https://papermc.io/api/v2/projects/paper/versions/1.8.8/builds/445/downloads/paper-1.8.8-445.jar")
            .pipe(fs.createWriteStream(path))
            .on("finish", () => {
                console.log("\x1b[32m%s\x1b[0m", "paper-1.8.8-445.jar downloaded!");
                execSync("cd Minecraft && java -jar paper-1.8.8-445.jar", {
                    stdio: "inherit"
                });
            });
    }
}

ngrok();
hibernateplugin();
server();
