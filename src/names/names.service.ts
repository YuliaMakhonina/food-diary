import { Inject, Injectable } from '@nestjs/common';
import Knex from 'knex';

export interface Name {
  id: number;
  name: string;
}

@Injectable()
export class NamesListService {
  constructor(@Inject('knex') private knex: Knex) {}

  async getNamesList(): Promise<Name> {
    return await this.knex.select().from('hello_world');
  }
}
