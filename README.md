# Voogd-Figma-Client

Originally developed for internal use at Voogd & Voogd Verzekeringen.

⚠️ This project is no longer supported by me nor by my previous employer.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
    - [Javascript](#javascript)
    - [Typescript/ES6](#typescriptes6)
- [Usage](#usage)
    - [Documents, Projects, and Project Files](#documents-projects-and-assets)
    - [Styles](#styles)
    - [Assets](#assets)
- [Definitions](#definitions)

<hr/>

## Prerequisites

[Your personal an access token for the Figma API.](https://www.figma.com/developers/api#authentication)

## Installation 

```
npm install @voogd/figma-client
```

### Javascript

```javascript
const { Client } = require("voogdfigma");

const voogdFigma = new Client("ACCESS_TOKEN");
```

### Typescript/ES6

```javascript
import { Client } from "voogdFigma";

const voogdFigma = new Client("ACCESS_TOKEN");
```

## Usage

### Documents, Projects, and Project Files

```javascript
// Fetching a document (no callback)
client
  .getDocument("YOUR_FILE_KEY")
  .then((document) => {})
  .catch((err) => {});

// Fetching a document (with callback)
function logMyDocument(document, err) {
  const message = err || document;
  console.log(message);
}

client.getDocument("YOUR_FILE_KEY", logMyDocument);
```

### Styles

```javascript
// All styles accross every projects (no callback)
client.getTeamStyle('YOUR_TEAM_ID')
  .then((styles) => {})
  .catch((err) => {});

// All styles accross every projects (with callback)
function logMyStyles(styles, err) {
  const message = err || document;
  console.log(message);
}

client.getTeamStyle('YOUR_TEAM_ID', logMyStyles);

// Uou can provide the key(s) of the file(s) in which the styles are defined.
// The call will then only those relevant styles.
client.getTeamStyle('YOUR_TEAM_ID', ['FILE_KEY_1', 'FILE_KEY_2'...])
  .then((styles) => {})
  .catch((err) => {});
```

### Assets

```javascript
const options = {
  assetRefs: [
    {
      // Node ID.
      id: "0:1",
      // Name the asset will hold on local disk
      exportAs: "foobar",
    },
  ],
  outDir: "./assets",
  format: "PNG",
};

// Exporting an asset (no callback)
client
  .exportAssets("YOUR_FILE_KEY", options)
  .then(() => {})
  .catch((err) => {});

// Exporting an asset (with callback)
function notifyUserOfExportStatus(err) {
  const message = err || "All assets have been exported!";
  console.log(message);
}

client.exportAssets("YOUR_FILE_KEY", options, notifyUserOfExportStatus);
```

## Definitions 

Some types may have been altered in order to make them more relevant to this project. 

Please refer to the project's definition file.

## License 

*No license*

Maximilien Zaleski © 2019
