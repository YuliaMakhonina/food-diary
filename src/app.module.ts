import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { FeelingsModule } from './feelings/feelings.module';
import { DiaryModule } from './diary/diary.module';

@Module({
  imports: [AuthModule, FoodModule, FeelingsModule, DiaryModule],
})
export class AppModule {}
