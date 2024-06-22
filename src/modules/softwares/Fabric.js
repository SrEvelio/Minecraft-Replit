module.exports = async (version) => {
  require("./FabricAPI")(version);
  return `https://meta.fabricmc.net/v2/versions/loader/${version}/0.15.11/1.0.1/server/jar`;
};
