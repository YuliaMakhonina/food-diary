import { Inject, Injectable } from '@nestjs/common';
import Knex, { QueryBuilder } from 'knex';
import { DiaryFeelingEntryDto } from './dto/diary.feeling.entry.dto';
import { DiaryFoodEntryDto } from './dto/diary.food.entry.dto';

@Injectable()
export class DiaryService {
  constructor(@Inject('knex') private knex: Knex) {}

  async addFoodToDiary(
    foodId: string,
    date: string,
    userId: string,
  ): Promise<DiaryFoodEntryDto> {
    await this.knex('diary_food').insert({
      user_id: userId,
      date: date,
      food_id: foodId,
    });
    const diaryFoodEntry: DiaryFoodEntryDto[] = await this.getFoodDiaryQuery()
      .where('diary_food.user_id', userId)
      .andWhere('diary_food.date', date);
    return diaryFoodEntry[diaryFoodEntry.length - 1];
  }

  async addFeelingToDiary(
    feelingId: string,
    date: string,
    userId: string,
  ): Promise<DiaryFeelingEntryDto> {
    await this.knex('diary_feelings').insert({
      user_id: userId,
      date: date,
      feeling_id: feelingId,
    });
    const diaryFeelingEntry: DiaryFeelingEntryDto[] = await this.getFeelingsDiaryQuery()
      .where('diary_feelings.user_id', userId)
      .andWhere('diary_feelings.date', date);
    return diaryFeelingEntry[diaryFeelingEntry.length - 1];
  }

  getFoodDiaryQuery(): QueryBuilder {
    return this.knex
      .select(
        this.knex.raw(`'food' as type`),
        'diary_food.date as date',
        'diary_food.uuid as id',
        this.knex.raw(
          `json_build_object(
            'id', food.uuid, 
            'name', food.name, 
            'calories', food.calories, 
            'proteins', food.proteins, 
            'fats', food.fats, 
            'carbs', food.carbs, 
            'sugar', food.sugar, 
            'fiber', food.fiber, 
            'system', food.system) as value`,
        ),
      )
      .from('diary_food')
      .innerJoin('food', 'food.uuid', 'diary_food.food_id');
  }

  getFeelingsDiaryQuery(): QueryBuilder {
    return this.knex
      .select(
        this.knex.raw(`'feeling' as type`),
        'diary_feelings.date as date',
        'diary_feelings.uuid as id',
        this.knex.raw(
          `json_build_object(
                'id', feelings.uuid, 
                'name', feelings.name, 
                'system', feelings.system) as value`,
        ),
      )
      .from('diary_feelings')
      .innerJoin('feelings', 'feelings.uuid', 'diary_feelings.feeling_id');
  }

  async getDiary(
    userId: string,
  ): Promise<(DiaryFoodEntryDto | DiaryFeelingEntryDto)[]> {
    return await this.knex(
      this.getFoodDiaryQuery()
        .where('diary_food.user_id', userId)
        .unionAll([
          this.getFeelingsDiaryQuery().where('diary_feelings.user_id', userId),
        ])
        .as('diary_table'),
    )
      .select('diary_table.*')
      .orderBy('diary_table.date', 'desc');
  }
}
