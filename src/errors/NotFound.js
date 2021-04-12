class NotFound extends Error {
  constructor(entity) {
    super();
    this.name = 'NotFound';
    this.message = `${entity} not found`;
  }
}

module.exports = NotFound;
