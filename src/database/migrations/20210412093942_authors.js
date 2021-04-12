exports.up = (knex) => knex.schema.createTable(
  'authors',
  (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('picture').notNullable();
    table.timestamps(true, true);
  },
);

exports.down = (knex) => knex.schema.dropTable('authors');
