import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('food', function(table) {
    table
      .uuid('uuid')
      .primary()
      .defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('name').notNullable();
    table.boolean('system').notNullable();
    table
      .float('calories')
      .notNullable()
      .defaultTo(0);
    table
      .float('proteins')
      .notNullable()
      .defaultTo(0);
    table
      .float('fats')
      .notNullable()
      .defaultTo(0);
    table
      .float('carbs')
      .notNullable()
      .defaultTo(0);
    table
      .float('sugar')
      .notNullable()
      .defaultTo(0);
    table
      .float('fiber')
      .notNullable()
      .defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('food');
}
