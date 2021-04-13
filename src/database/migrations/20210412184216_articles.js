exports.up = (knex) => knex.schema.createTable(
  'articles',
  (table) => {
    table.increments().primary();
    table.string('category').notNullable();
    table.string('title').notNullable();
    table.string('summary').notNullable();
    table.text('first_paragraph').notNullable();
    table.text('body').notNullable();
    table.integer('author_id').unsigned()
      .references('id').inTable('authors')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  },
);

exports.down = (knex) => knex.schema.dropTable('articles');
