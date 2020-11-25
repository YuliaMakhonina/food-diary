import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('hello_world', function(table) {
    table.increments();
    table.string('name');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('hello_world');
}
