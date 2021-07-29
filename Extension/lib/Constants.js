const fs = require("fs");
const path = require("path");

const isDebugMode = isAnyFileExisted(
  path.resolve(__dirname, "..", "DEBUG_SIGN_FILE"),
  path.resolve(__dirname, "DEBUG_SIGN_FILE")
);

module.exports = {
  isDebugMode,

  prefix: "slice",
  outputChannelName: "Slice",
};

//#=======================================

function isAnyFileExisted(...files) {
  return files.some((file) => fs.existsSync(file));
}

//#end-region
