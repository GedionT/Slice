const URL = require("url");
const fs = require("fs");
const vscode = require("vscode");
const request = require("request");

// User config read from vscode config
let userConfig = {
  url: "",
  token: "",
};

// init function, called when extension is activated
function init(extensionContext) {
  var { subscriptions } = extensionContext;

  // Register commands
  subscriptions.push(
    vscode.commands.registerCommand("Slice.showReport", showReport)
  );
  subscriptions.push(
    vscode.commands.registerCommand(
      "Slice.showReportInDashboard",
      showReportInDashboard
    )
  );

  // Read user config
  userConfig = _readUserConfig();
}

module.exports = {
  init,
  updateConfig,
};
