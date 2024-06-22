const got = require("got");
const baseUrl = "https://papermc.io/api/v2/projects/paper/versions";

module.exports = async (version) => {
  try {
    let res = await got(`${baseUrl}/${version}`);
    let body = JSON.parse(res.body);

    const latestBuild = body.builds[body.builds.length - 1];
    const jarFileName = `paper-${version}-${latestBuild}.jar`;

    return `${baseUrl}/${version}/builds/${latestBuild}/downloads/${jarFileName}`;
  } catch (err) {
    return null;
  }
};
