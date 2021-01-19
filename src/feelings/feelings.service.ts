import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';

export interface Feeling {
  feeling_id: string;
  name: string;
  system: boolean;
}

@Injectable()
export class FeelingsService {
  constructor(@Inject('knex') private knex: Knex) {}

  async addFeeling(userId: string, feelingName: string): Promise<string> {
    await this.knex('feelings').insert({
      name: feelingName,
      system: false,
      user_id: userId,
    });

    const feelingUuid = await this.knex
      .first('uuid')
      .from('feelings')
      .where('name', feelingName)
      .andWhere('user_id', userId);
    return feelingUuid.uuid.toString();
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
  async getAllFeelings(userId: string): Promise<Feeling[]> {
    const feelingsList: Feeling[] = await this.knex
      .select('uuid as feeling_id', 'name', 'system')
      .from('feelings')
      .where('user_id', userId)
      .orWhere('system', true)
      .orderBy('name');
    return feelingsList;
  }
}
