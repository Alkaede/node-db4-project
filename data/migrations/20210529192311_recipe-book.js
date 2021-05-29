
exports.up = async function(knex) {
  await knex.schema
  .createTable('recipes', tbl=>{
    tbl.increments('recipe_id')
    tbl.string('recipe_name', 200).notNullable().unique()
  })
  .createTable('ingredients', tbl => {
    tbl.increments('ingredient_id')
    tbl.string('ingredient_name', 200).notNullable().unique()
    tbl.string('ingredient_unit', 50)
  })
  .createTable('steps', tbl => {
    tbl.increments('step_id')
    tbl.string('step_text', 200).notNullable()
    tbl.integer('step_number').notNullable()
    tbl.integer('recipe_id')
      .unsigned()
      .notNullable()
      .references('recipe_id')
      .inTable('recipes')
      // .onDelete('RESTRICT')    //preserving references recipes that have a step pointing to it
      // .onUpdate('RESTRICT')
  })
  .createTable('step_ingredients', tbl => { //we want steps to have any number of ingredients
    // assigning ingredients table with recipe_id/step_id means the ingr can only be assigned to one of those
    tbl.increments('step_ingredient_id')
    tbl.float('quantity').notNullable()
    tbl.integer('step_id')
      .unsigned()
      .notNullable()
      .references('step_id')
      .inTable('steps')
    tbl.integer('ingredient_id')
      .unsigned()
      .notNullable()
      .references('ingredient_id')
      .inTable('ingredients')
  })
};

exports.down = async function(knex) {
  await knex.schema
  .dropTableIfExists('step_ingredients')
  .dropTableIfExists('steps')
  .dropTableIfExists('ingredients')
  .dropTableIfExists('recipes')
};
