import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';
import { FeelingsEntryDto } from './dto/feelings.entry.dto';

export interface Feeling {
  feeling_id: string;
  name: string;
  system: boolean;
}

@Injectable()
export class FeelingsService {
  constructor(@Inject('knex') private knex: Knex) {}

  async addFeeling(
    userId: string,
    feelingName: string,
  ): Promise<FeelingsEntryDto> {
    await this.knex('feelings').insert({
      name: feelingName,
      system: false,
      user_id: userId,
    });

    const feeling = await this.knex
      .first('uuid as id', 'name', 'system')
      .from('feelings')
      .where('name', feelingName)
      .andWhere('user_id', userId);
    return feeling;
  }

  async checkFeelingExisting(
    userId: string,
    feelingName: string,
  ): Promise<boolean> {
    if (
      await this.knex
        .first('uuid')
        .from('feelings')
        .where('name', feelingName)
        .andWhere('system', true)
    ) {
      return true;
    }
    return this.knex
      .first('uuid')
      .from('feelings')
      .where('name', feelingName)
      .andWhere('user_id', userId);
  }
  async getAllFeelings(userId: string): Promise<FeelingsEntryDto[]> {
    const feelings: FeelingsEntryDto[] = await this.knex
      .select('uuid as id', 'name', 'system')
      .from('feelings')
      .where('user_id', userId)
      .orWhere('system', true)
      .orderBy('name');
    return feelings;
  }
}
