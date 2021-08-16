//@ts-check

const vscode = require("vscode");
const helper = require("./VSCodeHelpers");

const VSCODE_SETTINGS = "vscode-settings";
const UNKNOWN = "unknown";

let lastActiveProject = UNKNOWN;

let baseUploadObject = {
  version: "1.0",
  // token: "This value will be set up in Uploader module", // not needed yet. Using userId now
  type: "",
  time: "",
  long: 0,
  lang: "",
  file: "",
  proj: "",
  pcid: "",

  line: 0,
  char: 0,
};

module.exports = { init, generateOpen, generateCode };

/**
 * Initialize upload object basic information
 * @param {string} [computerId]
 */
function init(computerId) {
  // workspaceFolder[0] alternative or root
  lastActiveProject =
    vscode.workspace.workspaceFolders[0].toString() || UNKNOWN;
  baseUploadObject.pcid = computerId;
}
function generateOpen(activeDocument, time, long) {
  return generate("open", activeDocument, time, long);
}
function generateCode(activeDocument, time, long) {
  return generate("code", activeDocument, time, long);
}

function generate(type, activeDocument, time, long) {
  let obj = Object.assign({}, baseUploadObject);
  let uri = activeDocument.uri;
  let fileName = activeDocument.fileName;

  obj.type = type;
  obj.proj = helper.getWhichProjectDocumentBelongsTo(
    activeDocument,
    lastActiveProject
  );

  // Reference 1:
  //   why set false to second parameter of function `asRelativePath`
  //   for example: ./src/hello.js under folder named "project1" in workspace
  //   result of parameter is true (default value):  project1/src/hello.js
  //   result of parameter is false: src/hello.js
  //   new parameter since VSCode 1.18.0:
  //   https://code.visualstudio.com/docs/extensionAPI/vscode-api#workspace.asRelativePath
  // obj.file = uri.scheme;
  obj.file = fileName;
  obj.lang = activeDocument.languageId;
  switch (uri.scheme) {
    case "file":
      obj.file = vscode.workspace.asRelativePath(uri.fsPath, false); // ^[1]
      obj.lang = activeDocument.languageId;
      break;
    case "vscode":
      if (uri.authority == "defaultsettings") {
        obj.file = VSCODE_SETTINGS;
        obj.lang = VSCODE_SETTINGS;
      }
      break;
  }

  obj.time = time;
  obj.long = long;
  obj.line = activeDocument.lineCount;
  obj.char = activeDocument.getText().length; // it affects extension efficiency

  console.log(obj);
  return obj;
}

// function dumpUploadObject(obj) {
//   return `${obj.type} from ${obj.time} long ${obj.long}; ${obj.file}(${obj.lang}; line: ${obj.line}}); `;
// }
