exports.seed = async (knex) => knex('users').del()
  .then(() => knex('users').insert([
    {
      email: 'raquel@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
      role: 'admin',
    },
    {
      email: 'will@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
      role: 'admin',
    },
    {
      email: 'florzinha@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
      role: 'subscriber',
    },
    {
      email: 'fibonacci@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
      role: 'subscriber',
    },
    {
      email: 'tesla@gmail.com',
      password: '$2b$12$hycXtMumU740v3hu2wxR6OQGxDqX3wbxrPi1lRF/MVKYLfnmeNjHy',
      email_verified: true,
      role: 'subscriber',
    },
  ]));
