const got = require('got');
const fs = require("fs");
const ngrok = require("ngrok");

const config = require("./config.json");
const { execSync } = require("child_process");

const minecraftFolderPath = 'Minecraft';
const serverJarPath = `${minecraftFolderPath}/server.jar`;

if (!fs.existsSync(minecraftFolderPath)) fs.mkdirSync(minecraftFolderPath);

const checkAndStartServer = () => {
    if (fs.existsSync(serverJarPath)) {
        startServer();
    } else {
        const softwareFilePath = `./softwares/${config.software}.json`;
        if (!fs.existsSync(softwareFilePath)) {
            return console.log('\x1b[31m%s\x1b[0m', 'The software you provided does not exist!');
        }

        const selected = require(softwareFilePath);
        if (!selected.versions[config.version]) {
            return console.log('\x1b[31m%s\x1b[0m', `${config.software} ${config.version} does not exist`);
        }

        console.log('\x1b[31m%s\x1b[0m', 'server.jar not found!');
        console.log('\x1b[34m%s\x1b[0m', 'I will try to download one for you.');
        console.log('\x1b[34m%s\x1b[0m', 'If for whatever reason it says that the Jar file is corrupt, you can delete the jar file and try running this again.');

        downloadServerJar(selected.versions[config.version]);
    };
}

const startServer = async () => {
    url = await ngrok.connect({ authtoken: process.env.authtoken, proto: 'tcp', addr: 25565 });

    console.log('\x1b[36m%s\x1b[0m', 'Starting Minecraft server...');
    console.log('\x1b[32m%s\x1b[0m', `Server IP: ${url.replace(/^tcp:\/\//, '')}`);
    console.log('\n');

    execSync(`cd ${minecraftFolderPath} && java -Xms512M -jar server.jar nogui`, { stdio: 'inherit' });
};

const downloadServerJar = downloadUrl => {
    got.stream(downloadUrl)
        .pipe(fs.createWriteStream(serverJarPath))
        .on('finish', () => {
            console.log('\x1b[32m%s\x1b[0m', 'server.jar downloaded!');
            startServer();
        });
};

checkAndStartServer();