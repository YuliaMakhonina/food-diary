import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';
import { FeelingsModule } from './feelings/feelings.module';
import { DiaryModule } from './diary/diary.module';
import { tokenMiddlewareFactory } from './middlewares/token.middleware';

@Module({
  providers: [tokenMiddlewareFactory],
  imports: [AuthModule, FoodModule, FeelingsModule, DiaryModule],
})
export class AppModule {}
