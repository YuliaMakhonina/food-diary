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
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FoodEntryDto } from './dto/food.entry.dto';

@ApiTags('food')
@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Post()
  @ApiCreatedResponse({ type: FoodEntryDto })
  async addFood(
    @Body()
    data: FoodDto,
    @Req() req: Request,
  ): Promise<FoodEntryDto> {
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
    const foodEntry = await this.foodService.addFood(
      req.userId,
      data.food_name,
      data.calories,
      data.proteins,
      data.fats,
      data.carbs,
      data.fiber,
      data.sugar,
    );
    if (foodEntry) {
      return foodEntry;
    } else {
      throw new BadRequestException('wrong_data', 'wrong data');
    }
  }

  @Get()
  @ApiCreatedResponse({ type: FoodEntryDto })
  async getAllFood(@Req() req: Request): Promise<FoodEntryDto[]> {
    const foodEntries = await this.foodService.getAllFood(req.userId);
    return foodEntries;
  }
}
