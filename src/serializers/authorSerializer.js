const Serializer = require('./serializer');

class AuthorSerializer extends Serializer {
  constructor(contentType, extraFields = []) {
    super();
    this.contentType = contentType;
    this.publicFields = [
      'name',
      'picture',
    ].concat(extraFields);
  }
}

module.exports = AuthorSerializer;
