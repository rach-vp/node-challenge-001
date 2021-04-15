class AccessDenied extends Error {
  constructor() {
    super();
    this.name = 'AccessDenied';
    this.message = 'Cannot complete action';
  }
}

module.exports = AccessDenied;
