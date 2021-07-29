const vscode = require("vscode");

// lib imports
const uploader = require("./lib/Uploader");
const log = require("./lib/Logger");
const { isDebugMode } = require("./lib/Constants");

/*
 *
 * Methods for uploading open track data
 * Uploading coding track data
 * Handle VSCode events
 * Update configurations
 *
 */

function activate(context) {
  console.log('Congratulations, your extension "Slice" is now active!');

  let disposable = vscode.commands.registerCommand(
    "slice.helloDev",
    function () {
      vscode.window.showInformationMessage(
        "Hello from Slice! 👋 I will track your habit and report to it to you."
      );
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
