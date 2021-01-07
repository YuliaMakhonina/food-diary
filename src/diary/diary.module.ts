import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';

@Module({
  imports: [KnexModule],
  controllers: [DiaryController],
  providers: [DiaryService],
})
export class DiaryModule {}
