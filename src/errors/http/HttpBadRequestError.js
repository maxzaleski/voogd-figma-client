class HttpBadRequestError extends Error {
  constructor() {
    super('400 (Bad Request) - Verify arguments');
    this.name = 'HttpBadRequestError';
  }
}

module.exports = HttpBadRequestError;
