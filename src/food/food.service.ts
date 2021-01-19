import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';

export interface Food {
  food_id: string;
  name: string;
  calories: number;
  proteins: number;
  fats: number;
  carbs: number;
  sugar: number;
  fiber: number;
  system: boolean;
}

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
  ): Promise<string> {
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
      .first('uuid')
      .from('food')
      .where('name', foodName)
      .andWhere('user_id', userId);
    return foodUuid.uuid.toString();
  }

  async checkFoodExisting(userId: string, foodName: string): Promise<boolean> {
    if (
      await this.knex
        .first('uuid')
        .from('food')
        .where('name', foodName)
        .andWhere('system', true)
    ) {
      return true;
    }
    return this.knex
      .first('uuid')
      .from('food')
      .where('name', foodName)
      .andWhere('user_id', userId);
  }

  async getAllFood(userId: string): Promise<Food[]> {
    const foodList: Food[] = await this.knex
      .select(
        'name',
        'uuid as food_id',
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
