import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists('authors', (table) => {
        table.increments('id');
        table.string('key').unique();
        table.string('name');
        table.integer('version');
        table.jsonb('numeric_values');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('authors');
}

