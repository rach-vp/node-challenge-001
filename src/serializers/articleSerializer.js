const Serializer = require('./serializer');

class ArticleSerializer extends Serializer {
  constructor(contentType, extraFields = []) {
    super();
    this.contentType = contentType;
    this.publicFields = [
      'author',
      'category',
      'title',
      'summary',
    ].concat(extraFields);
  }
}

module.exports = ArticleSerializer;
