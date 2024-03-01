/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('chat_rooms').del();
  await knex('chat_rooms').insert([
    { id: 1, room_name: 'General' },
    { id: 2, room_name: 'Hip-Hop' },
    { id: 3, room_name: 'Sports' },
  ]);
};
