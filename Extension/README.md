# slice README

This is the README for your extension "slice". After writing up a brief description, we recommend including the following sections.

## Features

## Requirements

Dependencies:

-      "name": "axios"
-      "name": "objects-to-csv"
-      "name": "node-fetch"
-      "name": "request",

## Extension Settings

- Slice.upload - uploads daily data to analytics through the backend

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

### 1.0.0

Initial release of Splice in Beta

### Documentation

- `extension.js`: the **gateway file** to the extension
- `lib/Constants.js`: bunch of constant files
- `lib/Core.js`: is the main controller that makes communication with the backend
- `lib/Log.js`: logs to Console and Performs VSCode popup messages for important information
- `lib/Uploader.js`: is the uploader module
- `package.json`: Extension/NPM description file (commands, meta info, scripts, ...)
