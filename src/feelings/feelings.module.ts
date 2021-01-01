import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { FeelingsController } from './feelings.controller';
import { FeelingsService } from './feelings.service';

@Module({
  imports: [KnexModule],
  controllers: [FeelingsController],
  providers: [FeelingsService],
})
export class FeelingsModule {}
