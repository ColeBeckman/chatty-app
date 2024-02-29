/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.createTable('chat_rooms', function (table) {
    table.increments();
    table.string('room_name');
  });
  await knex.schema.alterTable('messages', function (table) {
    table.integer('chat_room_id');
    table.foreign('chat_room_id').references('id').inTable('chat_rooms');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('chat_rooms');
};
