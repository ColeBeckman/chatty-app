const Knex = require('knex');

require('dotenv').config({ path: '../.env' });
module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.POSTGRES_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
