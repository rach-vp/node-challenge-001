const { Model } = require('objection');

const database = require('../database');

Model.knex(database);

class Author extends Model {
  static get tableName() {
    return 'authors';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 3 },
        email: { type: 'string', pattern: '^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$' },
        picture: { type: 'string' },
      },
    };
  }
}

module.exports = Author;
