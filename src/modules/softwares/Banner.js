const fs = require("fs");
const got = require("got");
const uD = require("../uDownload");

module.exports = async (v) => {
  if (!fs.existsSync("Minecraft/mods")) {
    fs.mkdirSync("Minecraft/mods");
  }

  try {
    let res = await got(
      `https://mohistmc.com/api/v2/projects/banner/${v}/builds/latest/`,
    );

    let body = JSON.parse(res.body);

    await uD(
      body.build.originUrl,
      `Minecraft/mods/Banner-${v}-${body.build.number}-server.jar`,
    );

    require("./FabricAPI")(v);
    return `https://meta.fabricmc.net/v2/versions/loader/${v}/0.15.11/1.0.1/server/jar`;
  } catch (err) {
    console.log(
      "\x1b[31m%s\x1b[0m",
      "An error occurred while downloading banner. Probably the version you specified does not exist.",
    );
  }
};
