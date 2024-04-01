const fs = require("fs");
const minecraftFolderPath = "Minecraft";

const acceptEula = async () => {
  fs.writeFile(`${minecraftFolderPath}/eula.txt`, "eula=true", (err) => {
    if (err) throw err;
  });
};

module.exports = acceptEula;
