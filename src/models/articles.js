const { Model } = require('objection');

const connection = require('../database');

Model.knex(connection);

const Author = require('./authors');

class Article extends Model {
  static get tableName() {
    return 'articles';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'category', 'summary', 'first_paragraph', 'body', 'author_id'],
      properties: {
        id: { type: 'integer' },
        title: { type: 'string', maxLength: 1000 },
        category: { type: 'string', maxLength: 100 },
        summary: { type: 'string', maxLength: 1000 },
        first_paragraph: { type: 'string' },
        body: { type: 'string' },
        author_id: { type: 'integer' },
      },
    };
  }

  static get relationMappings() {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: Author,
        join: {
          from: 'article.author_id',
          to: 'author.id',
        },
      },
    };
  }
}

module.exports = Article;
