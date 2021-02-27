class AssetExportError extends Error {
  /** @param {Error} err */
  constructor(err) {
    super(`Error during asset export: ${err}`);
    this.name = 'AssetExportError';
  }
}

module.exports = AssetExportError;
