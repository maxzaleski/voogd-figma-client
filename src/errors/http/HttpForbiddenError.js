class HttpForbiddenError extends Error {
  constructor() {
    super('403 (Forbidden) - Token is invalid');
    this.name = 'HttpForbiddenError';
  }
}

module.exports = HttpForbiddenError;
