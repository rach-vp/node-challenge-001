exports.up = (knex) => knex.schema.createTable(
  'users',
  (table) => {
    table.increments().primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.boolean('email_verified').defaultTo(false);
    table.enu('role', ['admin', 'subscriber']).defaultTo(false);
    table.timestamps(true, true);
  },
);

exports.down = (knex) => knex.schema.dropTable('users');
