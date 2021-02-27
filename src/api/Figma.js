const axios = require('axios').default;
const {
  HttpBadRequestError,
  HttpForbiddenError,
  HttpNotFoundError,
} = require('../errors/');
const {
  mapDocument,
  mapFiles,
  mapStyles
} = require('./mapping');

class FigmaWrapper {
  /** @param {string} personalAccessToken */
  constructor(personalAccessToken) {
    /** @private @const */
    this._accessToken = personalAccessToken;
  }

  /**
   * Get the document contained within a given fileId.
   *
   * @param {string} key The file's key.
   * @returns {Promise<Document>}
   *
   * @see https://www.figma.com/developers/docs#files
   */
  async getFileByFileKey(key) {
    const response = await this.fetchFromFigmaAPI(`/files/${key}`);
    return mapDocument(response.document);
  }

  /**
   * Get all projects for a given teamId.
   *
   * @param {string} teamId Id of the team to list projects from.
   * @returns {Promise<Project[]>}
   *
   * @see https://www.figma.com/developers/docs#projects
   */
  async getProjectsByTeamId(teamId) {
    return this.fetchFromFigmaAPI(`/teams/${teamId}/projects`);
  }

  /**
   * Get all files present for a given projectId.
   *
   * @param {number} projectId Id of the project to list files from.
   * @returns {Promise<File[]>}
   *
   * @see https://www.figma.com/developers/docs#get-project-files-endpoint
   */
  async getProjectFilesByProjectId(projectId) {
    const response = await this.fetchFromFigmaAPI(
      `/projects/${projectId}/files`
    );
    return mapFiles(response.files);
  }

  /**
   * Get image urls for all given IDs.
   *
   * @param {string} key The file's key
   * @param {string[]} ids A comma separated list of node IDs, e.g. ['0:1', '0:2', '0:3'].
   * @param {ImageFormat} format Image output format.
   * @returns {Promise<string[]>}
   *
   * @see https://www.figma.com/developers/docs#get-images-endpoint
   */
  async getAssetsByFileKeyAndNodeIDs(key, ids = [], format) {
    const path = `/images/${key}/?ids=${ids.join(',')}&format=${format.toLowerCase()}`;
    const response = await this.fetchFromFigmaAPI(path);
    return response.images;
  }

  /**
   * Get all styles stored in the team's library.
   * When provided with a file key,
   * the method will only return the styles which are defined in said file.
   *
   * @param {string} teamId Id of the team to list styles from.

   * @param {string[]?} keys Array of file keys.
   * @returns {Promise<Style[]>}
   *
   * @see https://www.figma.com/developers/api#get-team-styles-endpoint
   */
  async getStylesByTeamId(teamId, keys = []) {
    const response = await this.fetchFromFigmaAPI(
      `/teams/${teamId}/styles?page_size=10000`
    );

    const styles = mapStyles(response.meta.styles);
    if (!keys.length) return styles;

    return styles.filter((style) => keys.includes(style.fileKey));
  }

  /**
   * @private Makes the call to the Figma API.
   *
   * @param {string} path Figma endpoint path.
   * @returns {Promise<any>}
   */
  async fetchFromFigmaAPI(path) {
    try {
      const url = `https://api.figma.com/v1${path}`;
      const options = { headers: { 'X-FIGMA-TOKEN': this._accessToken } };
      const response = await axios.get(url, options);
      return response.data;
    } catch (err) {
      const { status } = err.response;

      // 400 - bad request, given args are invalid
      if (status === 400) throw new HttpBadRequestError();

      // 403 - forbidden, token is invalid
      if (status === 403) throw new HttpForbiddenError();

      // 404 - not found, no results
      if (status === 404) throw new HttpNotFoundError();
    }
  }
}

module.exports = FigmaWrapper;
