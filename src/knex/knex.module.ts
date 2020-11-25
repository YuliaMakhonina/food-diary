import { Module } from '@nestjs/common';
import * as knex from 'knex';

if (!process.env.DB_NAME) {
  throw new Error('DB_NAME is not set');
}

const knexFactory = {
  provide: 'knex',
  useFactory: () => {
    return knex({
      client: 'postgresql',
      connection: {
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
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
