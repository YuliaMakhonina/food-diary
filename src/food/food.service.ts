import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';
import { FoodEntryDto } from './dto/food.entry.dto';

@Injectable()
export class FoodService {
  constructor(@Inject('knex') private knex: Knex) {}

  async addFood(
    userId: string,
    foodName: string,
    calories: number,
    proteins: number,
    fats: number,
    carbs: number,
    fiber: number,
    sugar: number,
  ): Promise<FoodEntryDto> {
    await this.knex('food').insert({
      name: foodName,
      calories: calories,
      proteins: proteins,
      fats: fats,
      sugar: sugar,
      fiber: fiber,
      carbs: carbs,
      system: false,
      user_id: userId,
    });

    const foodUuid = await this.knex
      .first(
        'name',
        'uuid as id',
        'calories',
        'proteins',
        'fats',
        'carbs',
        'fiber',
        'sugar',
        'system',
      )
      .from('food')
      .where('name', foodName)
      .andWhere('user_id', userId);
    return foodUuid;
  }

  async checkFoodExisting(userId: string, foodName: string): Promise<boolean> {
    return this.knex
      .first('uuid')
      .from('food')
      .where('name', foodName)
      .andWhere('user_id', userId);
  }

  async getAllFood(userId: string): Promise<FoodEntryDto[]> {
    const foodList: FoodEntryDto[] = await this.knex
      .select(
        'name',
        'uuid as id',
        'calories',
        'proteins',
        'fats',
        'carbs',
        'fiber',
        'sugar',
        'system',
      )
      .from('food')
      .where('user_id', userId)
      .orWhere('system', true)
      .orderBy('name');
    return foodList;
  }
}
