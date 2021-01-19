import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';

export interface DiaryFoodEntry {
  id: string;
  type: 'food';
  date: Date;
  value: {
    food_id: string;
    name: string;
    calories: number;
    proteins: number;
    fats: number;
    carbs: number;
    sugar: number;
    fiber: number;
    system: boolean;
  };
}

export interface DiaryFeelingEntry {
  type: 'feeling';
  date: Date;
  feeling_id: string;
  value: {
    name: string;
    system: boolean;
  };
}

@Injectable()
export class DiaryService {
  constructor(@Inject('knex') private knex: Knex) {}

  async addFoodToDiary(
    foodId: string,
    date: string,
    userId: string,
  ): Promise<DiaryFoodEntry> {
    await this.knex('diary_food').insert({
      user_id: userId,
      date: date,
      food_id: foodId,
    });
    const diaryFoodEntrie: DiaryFoodEntry = await this.knex
      .first(
        this.knex.raw(`'food' as type`),
        'diary_food.date as date',
        this.knex.raw(
          `json_build_object('name', food.name, 'calories', food.calories, 'proteins', food.proteins, 'fats', food.fats, 'carbs', food.carbs, 'sugar', food.sugar, 'fiber', food.fiber, 'system', food.system) as value`,
        ),
      )
      .from('diary_food')
      .innerJoin('food', 'food.uuid', 'diary_food.food_id')
      .where('diary_food.user_id', userId)
      .andWhere('diary_food.date', date);
    return diaryFoodEntrie;
  }

  async addFeelingToDiary(
    feelingId: string,
    date: string,
    userId: string,
  ): Promise<DiaryFeelingEntry> {
    await this.knex('diary_feelings').insert({
      user_id: userId,
      date: date,
      feeling_id: feelingId,
    });
    const diaryFeelingEntrie: DiaryFeelingEntry = await this.knex
      .first(
        this.knex.raw(`'feeling' as type`),
        'diary_feelings.date as date',
        this.knex.raw(
          `json_build_object('name', feelings.name, 'system', feelings.system) as value`,
        ),
      )
      .from('diary_feelings')
      .innerJoin('feelings', 'feelings.uuid', 'diary_feelings.feeling_id')
      .where('diary_feelings.user_id', userId)
      .andWhere('diary_feelings.date', date)
      .orderBy('diary_feelings.date', 'desc');
    return diaryFeelingEntrie;
  }

  async getDiary(
    userId: string,
  ): Promise<DiaryFoodEntry | DiaryFeelingEntry[]> {
    return await this.knex(
      this.knex
        .select(
          this.knex.raw(`'food' as type`),
          'diary_food.date as date',
          this.knex.raw(
            `json_build_object('name', food.name, 'calories', food.calories, 'proteins', food.proteins, 'fats', food.fats, 'carbs', food.carbs, 'sugar', food.sugar, 'fiber', food.fiber, 'system', food.system) as value`,
          ),
        )
        .from('diary_food')
        .innerJoin('food', 'food.uuid', 'diary_food.food_id')
        .where('diary_food.user_id', userId)
        .unionAll([
          this.knex
            .select(
              this.knex.raw(`'feeling' as type`),
              'diary_feelings.date as date',
              this.knex.raw(
                `json_build_object('name', feelings.name, 'system', feelings.system) as value`,
              ),
            )
            .from('diary_feelings')
            .innerJoin('feelings', 'feelings.uuid', 'diary_feelings.feeling_id')
            .where('diary_feelings.user_id', userId),
        ])
        .as('table'),
    )
      .select('table.*')
      .orderBy('table.date', 'desc');
  }
}
