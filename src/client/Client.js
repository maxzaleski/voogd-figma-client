const FigmaWrapper = require('../api/Figma');
const Exporter = require('./Exporter');

class Client {
  /** @param {string} personalAccessToken */
  constructor(personalAccessToken) {
    /** @const */
    this.personalAccessToken = personalAccessToken;

    /** @private @const */
    this._figmaWrapper = new FigmaWrapper(personalAccessToken);

    /** @private @const */
    this._exporter = new Exporter(this._figmaWrapper);
  }

  /**
   * Get the document contained within a given file.
   *
   * @param {string} key The file's key.
   * @param {(document?: Document, err?: Error) => void} callback Function to call on response.
   * @returns {Promise<Document> | void}
   */
  getDocument(key, callback) {
    const call = this._figmaWrapper.getFileByFileKey(key);
    if (!callback) return call;
    call
      .then((document) => callback(document, undefined))
      .catch((err) => callback(undefined, err));
  }

  /**
   * Get all the projects assigned to a given team.
   *
   * @param {number} teamId Id of the team to list projects from.
   * @param {(projects?: Project[], err?: Error) => void} callback Function to call on response.
   * @returns {Promise<Project[]> | void}
   */
  getProjects(teamId, callback) {
    const call = this._figmaWrapper.getProjectsByTeamId(teamId);
    if (!callback) return call;
    call
      .then((projects) => callback(projects, undefined))
      .catch((err) => callback(undefined, err));
  }

  /**
   * Get all the files contained within a given project.
   *
   * @param {number} projectId Id of the project to list files from.
   * @param {(files?: File[], err?: Error) => void} callback Function to call on response.
   * @returns {Promise<File[]> | void}
   */
  getProjectFiles(projectId, callback) {
    const call = this._figmaWrapper.getProjectFilesByProjectId(projectId);
    if (!callback) return call;
    call
      .then((files) => callback(files, undefined))
      .catch((err) => callback(undefined, err));
  }

  /**
   * Get all styles stored in the team's library.
   * When provided with a file key,
   * the method will only return the styles which are defined in said file.
   *
   * @param {string} teamId
   * Id of the team to list styles from.
   * @param {string[]?} keys Array of file keys.
   * @param {(styles?: Style[], err?: Error) => void} callback Function to call on response.
   * @returns {Promise<Style[]> | void}
   */
  getTeamStyles(teamId, keys, callback) {
    const call = this._figmaWrapper.getStylesByTeamId(teamId, keys);
    if (!callback) return call;
    call
      .then((styles) => callback(styles, undefined))
      .catch((err) => callback(undefined, err));
  }

  /**
   * Exports assets from the document and saves them to local drive.
   *
   * @param {string} key File's key.
   * @param {ExportImagesOptions} options Export options.
   * @param {(err?: Error) => void} callback
   * @returns {Promise<void> | void}
   */
  exportAssets(key, options, callback) {
    const call = this._exporter.exportAssetByNodeIds(key, options);
    if (!callback) return call;
    call.then(() => callback(undefined))
      .catch((err) => callback(err));
  }
}

module.exports = Client;
