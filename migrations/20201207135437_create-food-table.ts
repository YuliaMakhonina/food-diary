import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('food', function(table) {
    table
      .uuid('uuid')
      .primary()
      .defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('name').notNullable();
    table.boolean('system').notNullable();
    table.integer('calories').notNullable();
    table
      .integer('proteins')
      .notNullable()
      .defaultTo(0);
    table
      .integer('fats')
      .notNullable()
      .defaultTo(0);
    table
      .integer('carbs')
      .notNullable()
      .defaultTo(0);
    table
      .integer('sugar')
      .notNullable()
      .defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('food');
}
