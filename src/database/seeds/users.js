exports.seed = async (knex) => knex('users').del()
  .then(() => knex('users').insert([
    { email: 'raquel@gmail.com', password: '123456789' },
    { email: 'will@gmail.com', password: '123456789' },
    { email: 'florzinha@gmail.com', password: '123456789' },
    { email: 'fibonacci@gmail.com', password: '123456789' },
    { email: 'tesla@gmail.com', password: '123456789' },
  ]));
