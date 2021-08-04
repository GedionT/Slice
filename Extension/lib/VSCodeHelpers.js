"use strict";

let vscode = require("vscode");

let showingErrorMsg = 0;

module.exports = {
  getConfig,
  cloneTextDocument,
  cloneUri,
  dumpDocument,
  dumpEditor,
  showSingleErrorMsg,
  getWhichProjectDocumentBelongsTo,
};

function getConfig(name = "") {
  return vscode.workspace.getConfiguration(name);
}

function cloneTextDocument(doc) {
  if (!doc) return null;
  return Object.assign({}, doc, { uri: cloneUri(doc.uri) });
}

function cloneUri(uri) {
  if (!uri) return null;
  return vscode.Uri.parse(uri.toString());
}

function dumpDocument(doc) {
  if (!doc) return "null";

  let str =
    vscode.workspace.asRelativePath(doc.fileName) +
    ` (${doc.languageId})(ver:${doc.version})` +
    `(scheme: ${doc.uri ? doc.uri.scheme : ""}): `;
  if (doc.isClosed) str += " Closed";
  if (doc.isDirty) str += " Dirty";
  if (doc.isUntitled) str += " Untitled";
  return str;
}

function dumpEditor(editor) {
  if (!editor) return "null";
  return `Editor: (col:${editor.viewColumn}) ${dumpDocument(editor.document)}`;
}

function showSingleErrorMsg(error) {
  if (!showingErrorMsg)
    vscode.window
      .showErrorMessage(error)
      .then(() => process.nextTick(() => (showingErrorMsg = 0)));
  showingErrorMsg = 1;
}

// --------------------------
function getWhichProjectDocumentBelongsTo(document, defaultProjectPath) {
  // older vscode api don't have getWorkspaceFolder api

  if (!vscode.workspace.getWorkspaceFolder) return defaultProjectPath;

  if (!document || !document.uri) return defaultProjectPath;

  let { uri } = document;

  if (uri.scheme != "file") return defaultProjectPath;

  let folder = vscode.workspace.getWorkspaceFolder(uri);

  // this document located in a workspace outside
  if (!folder) return defaultProjectPath;

  return folder.uri.fsPath;
}
