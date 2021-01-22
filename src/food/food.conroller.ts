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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('food')
@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post()
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

  @Get()
  async getAllFood(@Req() req: Request) {
    const foodList = await this.foodService.getAllFood(req.userId);
    return { food_list: foodList };
  }
}
