const got = require('got');
const fs = require("fs"); 
const { execSync } = require("child_process");
const path = "./paper-1.8.8-445.jar";

const start = () => {
    if (fs.existsSync(path))
        execSync("java -jar paper-1.8.8-445.jar", { stdio: "inherit" });
    else
        console.log("\x1b[31m%s\x1b[0m", "paper-1.8.8-445.jar not found!");
        console.log("\x1b[34m%s\x1b[0m", "I will try to download one for you.");
        console.log("\x1b[34m%s\x1b[0m", "If for whatever reason it says that the Jar file is corrupt, you can delete the jar file and try running this again.");
        got.stream("https://papermc.io/api/v2/projects/paper/versions/1.8.8/builds/445/downloads/paper-1.8.8-445.jar")
        .pipe(fs.createWriteStream(path))
        .on("finish", () => {
            console.log("\x1b[32m%s\x1b[0m", "paper-1.8.8-445.jar downloaded!");
            execSync("java -jar paper-1.8.8-445.jar", { stdio: "inherit" });
        }
        );
}

start();
