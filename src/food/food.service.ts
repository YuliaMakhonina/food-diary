import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';

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
}
