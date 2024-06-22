const got = require("got");
const fs = require("fs");

const uD = require("../uDownload");
const Modrinth = "https://api.modrinth.com/v2";

module.exports = async (version) => {
  if (!fs.existsSync("Minecraft/mods")) {
    fs.mkdirSync("Minecraft/mods");
  }

  const res = await got(`${Modrinth}/project/fabric-api/version`);
  let body = JSON.parse(res.body);
  let fainfo = body.find((x) => x.game_versions.includes(version));

  uD(fainfo.files[0].url, `Minecraft/mods/${fainfo.files[0].filename}`);
};
