import { Module } from '@nestjs/common';
import * as knex from 'knex';
import * as config from 'config';

const knexFactory = {
  provide: 'knex',
  useFactory: () => {
    return knex({
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
    });
  },
};

@Module({
  providers: [knexFactory],
  exports: [knexFactory],
})
export class KnexModule {}
