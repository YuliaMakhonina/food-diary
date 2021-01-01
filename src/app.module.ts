import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { FeelingsModule } from './feelings/feelings.module';

@Module({
  imports: [AuthModule, FoodModule, FeelingsModule],
})
export class AppModule {}
