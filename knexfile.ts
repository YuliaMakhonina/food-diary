import * as config from 'config';

module.exports = {
  client: 'postgresql',
  connection: {
    connectionString: config.get('db.url'),
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
