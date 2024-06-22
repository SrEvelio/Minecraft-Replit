const got = require("got");

module.exports = async (version) => {
  try {
    const piston = await got(
      "https://piston-meta.mojang.com/mc/game/version_manifest.json",
    );

    const versions = JSON.parse(piston.body).versions;
    const vinfo = versions.find((x) => x.id == version);

    let res = await got(vinfo.url);
    let body = JSON.parse(res.body);

    return body.downloads.server.url;
  } catch (err) {
    return null;
  }
};
