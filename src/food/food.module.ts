import { Module } from '@nestjs/common';
import { KnexModule } from '../knex/knex.module';
import { FoodController } from './food.conroller';
import { FoodService } from './food.service';

@Module({
  imports: [KnexModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
