//@ts-check

const vscode = require("vscode");
const ext = require("./VSCodeHelpers");
const Request = require("request");

let Q = [],
  uploadURL,
  uploadToken,
  uploadHeader = {
    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  },
  uploading = 0,
  //Avoid Show error information too many times
  hadShowError = 0,
  retryTime = 0,
  uploadProxy = undefined;

let uploader = {
  /**
   * @param {string} url
   * @param {string} token
   * @param {string|boolean|undefined} proxy
   */
  set: function (url, token, proxy) {
    uploadURL = url;
    uploadToken = token;
    uploadProxy = proxy;
  },
  upload: function (data) {
    Q.push(data);
    process.nextTick(_upload);
  },
};

function _upload() {
  //Upload Lock
  if (uploading) return;
  //Queue is empty

  uploading = 1;

  var data = Q[0];
  //Set up upload token
  data.token = uploadToken;

  /** @type {Request.CoreOptions} */
  const uploadOptions = { method: "POST", form: data, headers: uploadHeader };
  if (typeof uploadProxy !== "undefined") uploadOptions.proxy = uploadProxy;

  Request(uploadURL, uploadOptions, function (err, res, bd) {
    uploading = 0;

    let success = true;
    let returnObject = { error: "Unable to connect" };

    if (err) {
      success = false;
      //Upload failed because network error
      //So check is local server mode ?
      //If is local server mode now, just start a new local server now.
      showErrorMessage(1, `Could not upload coding record: ${err.stack}`);
    }

    //If there are not network error
    if (success) {
      if (res.statusCode === 200 || res.statusCode === 403) {
        returnObject = toJSON(bd);
        if (returnObject.JSONError) {
          success = false;
          showErrorMessage(
            2,
            `Upload error: Server response content is not JSON!`
          );
        }
        if (returnObject.error) {
          success = false;
          showErrorMessage(3, `Upload error: ${returnObject.error}`);
        }
      } else {
        success = false;
        showErrorMessage(
          2,
          `Upload error: Response: ${res.statusCode} (${res.statusMessage})`
        );
      }
    }

    uploading = 0;
    //upload failed
    if (!success) {
      retryTime++;
      setTimeout(_upload, 3000);
    } else {
      Q.shift();
      hadShowError = retryTime = 0;
      process.nextTick(_upload);
    }

    //End callback
  });
}

//Methods
function toJSON(bd) {
  try {
    return JSON.parse(bd);
  } catch (err) {
    return { JSONError: true, error: "Unrecognized response" };
  }
}

/**
 * @param {number} id
 * @param {Error|string} error
 * @returns
 */
function showErrorMessage(id, error) {
  if (hadShowError == id) return;
  hadShowError = id;
  ext.showSingleErrorMsg(error);
}

module.exports = uploader;
