import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('feelings', function(table) {
    table
      .uuid('uuid')
      .primary()
      .defaultTo(knex.raw('(gen_random_uuid())'));
    table.string('name').notNullable();
    table.uuid('user_id');
    table
      .foreign('user_id')
      .references('users.uuid')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.boolean('system').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('feelings');
}
