exports.seed = async (knex) => {
  // truncate all existing tables
  await knex.raw('TRUNCATE TABLE "users" CASCADE');

  // Deletes ALL existing entries
  return knex('authors').del()
  // Inserts seed entries
    .then(() => knex('authors').insert([
      {
        name: 'Raquel',
        email: 'raquel@gmail.com',
        picture: 'https://via.placeholder.com/50',
      },
      {
        name: 'Will',
        email: 'will@gmail.com',
        picture: 'https://via.placeholder.com/50',
      },
      {
        name: 'Flor',
        email: 'flor@gmail.com',
        picture: 'https://via.placeholder.com/50',
      },
    ]));
};
