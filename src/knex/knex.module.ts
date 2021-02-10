import { Module } from '@nestjs/common';
import * as knex from 'knex';
import * as config from 'config';

const knexFactory = {
  provide: 'knex',
  useFactory: () => {
    return knex({
      client: 'postgresql',
      connection: {
        connectionString: config.get('db.url'),
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
