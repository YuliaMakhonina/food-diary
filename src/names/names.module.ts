import Knex from 'knex';
import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { NamesListController } from './names.controller';
import { NamesListService } from './names.service';

@Module({
  imports: [KnexModule],
  controllers: [NamesListController],
  providers: [NamesListService],
})
export class NamesListModule {}
