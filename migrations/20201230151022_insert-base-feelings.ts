import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex('feelings').insert([
    {
      name: 'Сыпь',
      system: true,
      user_id: null,
    },
    {
      name: 'Диарея',
      system: true,
      user_id: null,
    },
    {
      name: 'Запор',
      system: true,
      user_id: null,
    },
    {
      name: 'Изжога',
      system: true,
      user_id: null,
    },
    {
      name: 'Боль в правом подреберье',
      system: true,
      user_id: null,
    },
    {
      name: 'Рвота',
      system: true,
      user_id: null,
    },
    {
      name: 'Боль в желудке',
      system: true,
      user_id: null,
    },
    {
      name: 'Боль в животе',
      system: true,
      user_id: null,
    },
    {
      name: 'Затрудненное дыхание',
      system: true,
      user_id: null,
    },
    {
      name: 'Отрыжка воздухом',
      system: true,
      user_id: null,
    },
  ]);
}

export async function down(knex: Knex): Promise<void> {}
