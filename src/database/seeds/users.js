exports.seed = async (knex) => {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "users" CASCADE');

  // Deletes ALL existing entries
  return knex('users').del()
  // Inserts seed entries
    .then(() => knex('users').insert([
      { email: 'raquel@gmail.com', password: '123456789' },
      { email: 'will@gmail.com', password: '123456789' },
      { email: 'florzinha@gmail.com', password: '123456789' },
      { email: 'fibonacci@gmail.com', password: '123456789' },
      { email: 'tesla@gmail.com', password: '123456789' },
    ]));
};
