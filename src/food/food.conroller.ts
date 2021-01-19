import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  Get,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { Request } from 'express';
import { FoodDto } from './dto/food.dto';

@Controller()
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post('food/add')
  async addFood(
    @Body()
    data: FoodDto,
    @Req() req: Request,
  ) {
    const foodExists = await this.foodService.checkFoodExisting(
      req.userId,
      data.food_name,
    );
    if (foodExists) {
      throw new BadRequestException(
        `incorrect data`,
        `this food already exists at user list`,
      );
    }
    const foodUuid = await this.foodService.addFood(
      req.userId,
      data.food_name,
      data.calories,
      data.proteins,
      data.fats,
      data.carbs,
      data.fiber,
      data.sugar,
    );
    if (foodUuid) {
      return { food_id: foodUuid };
    } else {
      throw new BadRequestException('wrong_data', 'wrong data');
    }
  }

  @Get('food/all')
  async getAllFood(@Req() req: Request) {
    const foodList = await this.foodService.getAllFood(req.userId);
    return { food_list: foodList };
  }
}
