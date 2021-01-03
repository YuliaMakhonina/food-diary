import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';

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
    return this.knex
      .first('uuid')
      .from('feelings')
      .where('name', feelingName);
  }
}
