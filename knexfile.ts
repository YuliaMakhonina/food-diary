import * as config from 'config';

module.exports = {
  client: 'postgresql',
  connection: {
    port: config.get('db.port'),
    database: config.get('db.name'),
    user: config.get('db.user'),
    password: config.get('db.pass'),
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
