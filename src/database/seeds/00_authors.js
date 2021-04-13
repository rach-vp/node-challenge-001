exports.seed = async (knex) => knex('authors').del()
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
