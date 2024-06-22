const got = require("got");
const fs = require("fs");

async function uD(url, path) {
  await got
    .stream(url)
    .on("error", (err) => {
      //console.error(err);
      console.log(
        "\x1b[31m%s\x1b[0m",
        "An error occurred while downloading some things",
      );
    })
    .pipe(fs.createWriteStream(path));
}

module.exports = uD;
