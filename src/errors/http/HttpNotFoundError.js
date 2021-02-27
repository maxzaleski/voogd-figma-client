class HttpNotFoundError extends Error {
  constructor() {
    super('404 (Not Found) - Verify arguments');
    this.name = 'HttpNotFoundError';
  }
}

module.exports = HttpNotFoundError;
