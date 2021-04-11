const knex = require('knex')({
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_DEV_NAME,
      user: process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASSWORD,
    },
  },
});

module.exports = knex;
