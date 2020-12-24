import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { FoodModule } from './food/food.module';

@Module({
  imports: [AuthModule, FoodModule],
})
export class AppModule {}
