const uD = require("../uDownload");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

module.exports = async (version) => {
  uD(
    "https://quiltmc.org/api/v1/download-latest-installer/java-universal",
    `Minecraft/quilt-installer.jar`,
  );

  setTimeout(() => {
    execSync(
      `cd Minecraft && java -jar quilt-installer.jar \ install server ${version} \ --download-server`,
      { stdio: "inherit" },
    );
    setTimeout(() => {
      fs.readdir("Minecraft/server", (err, files) => {
        files.forEach((file) => {
          const sourcePath = path.join("Minecraft/server", file);
          const destPath = path.join("Minecraft", file);
          fs.rename(sourcePath, destPath, (err) => {
            return err;
          });
        });
      });
      setTimeout(() => {
        fs.rmdirSync("Minecraft/server");
        fs.unlinkSync("Minecraft/quilt-installer.jar");
      }, 5000);
    }, 5000);
  }, 5000);
};
