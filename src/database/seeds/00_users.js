exports.seed = async (knex) => knex('users').del()
  .then(() => knex('users').insert([
    {
      email: 'raquel@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
    },
    {
      email: 'will@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
    },
    {
      email: 'florzinha@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
    },
    {
      email: 'fibonacci@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
    },
    {
      email: 'tesla@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
    },
  ]));
