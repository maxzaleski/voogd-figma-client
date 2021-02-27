const axios = require('axios').default;
const fs = require('fs');
const { AssetExportError } = require('../errors/');

class Exporter {
  /** @param {FigmaWrapper} api */
  constructor(api) {
    /** @private @const {FigmaWrapper} */
    this._api = api;

    /** @private @const */
    this._defaultOutDir = 'exported';
  }

  /**
   * Export all assets via their node id.
   *
   * @param {string} key The file's key.
   * @param {ExportAssetsOptions} options Export settings.
   * @returns {Promise<void>}
   */
  async exportAssetByNodeIds(key, options) {
    const ids = options.assetRefs.map((ref) => ref.id);
    const format = options.format || 'PNG';
    const response = await this._api.getAssetsByFileKeyAndNodeIDs(key, ids, format);

    try {
      const promises = this.checkForDirectory(options.outDir)
        .mapAssets(response, options.assetRefs)
        .map((asset) => this.writeToDisk(asset, options));
      await Promise.all(promises);
    } catch (err) {
      throw new AssetExportError(err);
    }
  }

  /**
   * @private
   * Writes byte stream to local disk.
   *
   * @param {Asset} asset
   * @param {ExportAssetsOptions} writeOptions
   * @returns {Promise<void>}
   */
  async writeToDisk(asset, writeOptions) {
    const dir = writeOptions.outDir || this._defaultOutDir;
    const path = `${dir}/${
      asset.exportAs
    }.${writeOptions.format.toLowerCase()}`;
    const stream = fs.createWriteStream(path);

    const options = {
      strictSSL: false,
      responseType: 'stream'
    };
    const response = await axios.get(asset.url, options);

    return new Promise((resolve) => {
      response.data
        .pipe(stream)
        .on('error', (err) => {
          throw err;
        })
        .on('finish', () => {
          stream.end();
          resolve();
        });
    });
  }

  /**
   * @private
   * Creates the output directory which will contain the assets.
   *
   * @param {string} directory
   * @returns {Promise<void>}
   */
  checkForDirectory(directory) {
    const dir = directory || this._defaultOutDir;
    const exists = fs.existsSync(dir);
    if (!exists) fs.mkdirSync(dir);
    return this;
  }

  /** @private */
  mapAssets(res, assetsRef) {
    return Object.keys(res).map((id) => {
      const ref = assetsRef.find((asset) => asset.id === id);
      return {
        exportAs: ref.exportAs,
        url: res[id]
      };
    });
  }
}

module.exports = Exporter;
