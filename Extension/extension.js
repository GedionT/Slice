const vscode = require("vscode");
const axios = require("axios").default;

// lib imports
const uploader = require("./lib/Uploader");
const log = require("./lib/Logger");
const { isDebugMode } = require("./lib/Constants");

/*
 * Method to authenticate self from api - done
 * Methods for uploading open track data
 * Uploading coding track data
 * Handle VSCode events
 * Update configurations
 *
 */

async function activate(context) {
  let username, password;

  // authenticate with slice dashboard system
  username = await vscode.window.showInputBox({
    placeHolder: "Slice Username",
    prompt: "Enter your Slice Dashboard Account Username",
  });

  password = await vscode.window.showInputBox({
    placeHolder: "Slice Password",
    password: true,
    prompt: "Enter your Slice Dashboard Account Password",
  });

  vscode.window.showInformationMessage("Authenticating ... ");

  const resp = await axios
    .post(`https://slice--back.herokuapp.com/api/users/account/login`, {
      username: username,
      password: password,
    })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));

  vscode.window.showInformationMessage(resp.data.message);

  let disposable = vscode.commands.registerCommand(
    "slice.startTracking",
    () => {
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
