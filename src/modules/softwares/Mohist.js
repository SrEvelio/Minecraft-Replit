const baseUrl = "https://mohistmc.com/api/v2/projects/mohist";

module.exports = async (version) => {
  try {
    return `${baseUrl}/${version}/builds/latest/download`;
  } catch (err) {
    return null;
  }
};
