import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_food', function(table) {
    table
      .uuid('uuid')
      .primary()
      .defaultTo(knex.raw('(gen_random_uuid())'));
    table.uuid('food_id').notNullable();
    table
      .foreign('food_id')
      .references('food.uuid')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.uuid('user_id').notNullable();
    table
      .foreign('user_id')
      .references('users.uuid')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_food');
}
