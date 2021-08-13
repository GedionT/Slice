// @ts-nocheck
const vscode = require("vscode");
const axios = require("axios").default;

/* lib imports */
const extHelpers = require("./lib/VSCodeHelpers");
const uploadObject = require("./lib/UploadObject");
const uploader = require("./lib/Uploader");
const { generateDiagnoseLogFile } = require("./lib/EnvProbe");

/* Setting Constants */
const SECOND = 1000; // How many ms in 1s
// at least time to upload a watching(open) record
const CODING_SHORTEST_UNIT_MS = 5 * SECOND;
// at least time to upload a watching(open) record
const AT_LEAST_WATCHING_TIME = 5 * SECOND;
// if not intently watching time is more than this number,
// the watching track will not be continuously but a new record
const MAX_ALLOW_NOT_INTENTLY_MS = 60 * SECOND;
// if you have time below not coding (pressing keyboard),
// the coding track record will be upload
const MAX_CODING_WAIT_TIME = 30 * SECOND;

/* file schemes to ignore while tracking */
const INVALID_CODING_DOCUMENT_SCHEMES = [
  "git-index",
  "git",
  "output",
  "input",
  "private",
];

const EMPTY = { document: null, textEditor: null };

// more thinking time ( later version from user config )
let moreThinkingTime = 0;
//  current active document
let activeDocument;

//  Tracking data, record document open time, first coding time, and last coding time, and coding session length
let trackData = {
  openTime: 0,
  lastIntentlyTime: 0,
  firstCodingTime: 0,
  lastCodingTime: 0,
  codingSessionLength: 0,
};
let resetTrackOpenAndIntentlyTime = (now) => {
  trackData.openTime = trackData.lastIntentlyTime = now;
};

let username,
  password,
  userId,
  userToken,
  uploadURL,
  userTkn,
  stat = "Error";

/* upload the track data methods */

function uploadOpenTrackData(now) {
  //If active document is not a ignore document
  if (!isIgnoreDocument(activeDocument)) {
    let longest =
        trackData.lastIntentlyTime +
        MAX_ALLOW_NOT_INTENTLY_MS +
        moreThinkingTime,
      long = Math.min(now, longest) - trackData.openTime;

    uploadObject
      .generateOpen(activeDocument, trackData.openTime, long)
      .then((data) => uploader.push(data))
      .catch((err) => console.log("error: " + err));
  }
  resetTrackOpenAndIntentlyTime(now);
}

function uploadCodingTrackData(now) {
  // if active document is not a ignore document
  if (!isIgnoreDocument(activeDocument)) {
    uploadObject
      .generateCode(
        activeDocument,
        trackData.firstCodingTime,
        trackData.codingLong
      )
      .then((data) => uploader.push(data))
      .catch((err) => console.log("error: " + err));
  }
  // re-tracking coding track data
  trackData.codingSessionLength =
    trackData.lastCodingTime =
    trackData.firstCodingTime =
      0;
}

/* Check a text document if it is a ignore doc ( null/'in-memory') */

function isIgnoreDocument(doc) {
  return !doc || doc.uri.scheme == "in-memory";
}

/* handle vscode events */

let EventHandler = {
  onIntentlyWatchingCodes: (textEditor) => {
    if (!textEditor || !textEditor.document) return; // empty doc

    let now = Date.now();
    // long time have not intently watching document
    if (
      now >
      trackData.lastIntentlyWatchingTime +
        MAX_ALLOW_NOT_INTENTLY_MS +
        moreThinkingTime
    ) {
      uploadOpenTrackData(now);
      // uploadOpenTrackDate has same expression like:
      // resetTrackOpenAndIntentlyTime(now);
    } else {
      trackData.lastIntentlyTime = now;
    }
  },

  onActiveFileChange: (doc) => {
    let now = Date.now();
    // if there is a text editor opened before changed, should upload the open track data
    if (activeDocument) {
      // at least open 5 sec
      if (trackData.openTime < now - AT_LEAST_WATCHING_TIME)
        uploadOpenTrackData(now);

      // at least coding 1 second
      if (trackData.codingSessionLength) uploadCodingTrackData();
    }

    activeDocument = extHelpers.cloneTextDocument(doc);
    // re-track file open time again (prevent has not re-tracked open time when upload open tracking data has been called)
    resetTrackOpenAndIntentlyTime(now);
    trackData.codingSessionLength =
      trackData.lastCodingTime =
      trackData.firstCodingTime =
        0;
  },

  onFileCoding: (doc) => {
    // onFileCoding is alias of event 'onDidChangeTextDocument'
    // an event that is emitted when a text document is changed.
    // this event is fired when the document is changed, even if only a small part of the document is changed.
    // such as changes like the dirty - state changes

    if (!activeDocument) return;

    // ignore invalid coding file schemes
    if (!doc || INVALID_CODING_DOCUMENT_SCHEMES.indexOf(doc.uri.scheme) >= 0)
      return;

    let now = Date.now();
    // if time is too short to calling this function then just ignore it
    if (now - CODING_SHORTEST_UNIT_MS < trackData.lastCodingTime) return;

    // update the document line count
    activeDocument.lineCount = doc.lineCount;

    // if is first time coding in this file, record time
    if (!trackData.firstCodingTime) trackData.firstCodingTime = now;
    //If too long time to recoding, so upload old coding track and re-tracking
    else if (
      trackData.lastCodingTime <
      now - MAX_CODING_WAIT_TIME - moreThinkingTime
    ) {
      //30s
      uploadCodingTrackData();
      //Reset first coding time
      trackData.firstCodingTime = now;
    }
    trackData.codingLong += CODING_SHORTEST_UNIT_MS;
    trackData.lastCodingTime = now;
  },
};

/* when extension launch or vscode config change */
async function updateConfigurations(username, password) {
  // login
  let uName = username;
  let pwd = password;

  await axios({
    method: "POST",
    url: "https://slice--back.herokuapp.com/api/users/account/login",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      githubUsername: uName,
      password: pwd,
    },
  })
    .then((response) => {
      console.log(response);
      if (response.status == 200) {
        stat = "Success. You are Logged In!";
        userId = response.data.data.userid;
        userTkn = response.data.data.token;
        userToken = userTkn;
        uploadURL = `https://slice--back.herokuapp.com/api/data/exten/data/send/${userId}`;
      }
    })
    .catch((error) => console.log(error));
}

/*  This method gets activated when extension launches */
async function activate(context) {
  generateDiagnoseLogFile();
  // make checks for token validity and userId and reconfigure -- later addition

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

  await updateConfigurations(username, password);

  vscode.window.showInformationMessage("Authenticating ... ");
  vscode.window.showInformationMessage(stat);

  let subscriptions = context.subscriptions;

  // initialize the uploadObject and uploader
  uploadObject.init(`${username}-session-${require("os").platform()}`);

  uploader.set(uploadURL, userToken);

  // ** Core Activity Tracker ** //

  // tracking the file display when vscode open
  EventHandler.onActiveFileChange(
    (vscode.window.activeTextEditor || EMPTY).document
  );

  // listening vscode event to record coding activity
  subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((e) =>
      EventHandler.onFileCoding((e || EMPTY).document)
    )
  );

  subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((e) =>
      EventHandler.onActiveFileChange((e || EMPTY).document)
    )
  );

  // when event = changing cursor in the document (watching intently in some ways)
  subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection((e) =>
      EventHandler.onIntentlyWatchingCodes((e || EMPTY).textEditor)
    )
  );

  let upload = vscode.commands.registerCommand("slice.upload", function () {
    console.log("Pushing data for analytics now ... \n");
    uploader.upload();
  });

  subscriptions.push(upload);
}

// this method is called when your extension is deactivated
function deactivate() {
  EventHandler.onActiveFileChange(null);
  // add code here to exp. token client side
}

module.exports = {
  activate,
  deactivate,
};
