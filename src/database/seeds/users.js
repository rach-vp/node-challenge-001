exports.seed = async (knex) => knex('users').del()
  .then(() => knex('users').insert([
    { email: 'raquel@gmail.com', password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy' },
    { email: 'will@gmail.com', password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy' },
    { email: 'florzinha@gmail.com', password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy' },
    { email: 'fibonacci@gmail.com', password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy' },
    { email: 'tesla@gmail.com', password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy' },
  ]));
