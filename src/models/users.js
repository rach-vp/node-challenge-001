const { Model } = require('objection');

const database = require('../database');

Model.knex(database);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', pattern: '^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$' },
        password: { type: 'string', minLength: 6 },
        email_verified: { type: 'boolean', default: false },
        role: { type: 'string', enum: ['admin', 'subscriber'], default: 'subscriber' },
      },
    };
  }
}

module.exports = User;
