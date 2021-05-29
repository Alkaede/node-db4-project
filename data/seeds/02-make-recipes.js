const recipes = [
  {recipe_name: 'Spaghetti'}
]

const ingredients = [
  {ingredient_name: 'Spaghetti Pasta', ingredient_unit: 'oz'},
  {ingredient_name: 'Tomato Sauce', ingredient_unit: 'ml'},
  {ingredient_name: 'Oregano', ingredient_unit: 'tsp'}
]

const step_ingredients = [
  // first step that puts together ingredients with steps
  // boil water doesn't have ingredients so I can ignore it and continue with the next ones
  {step_id: 2, ingredient_id: 1, quantity: 10},
  {step_id: 3, ingredient_id: 2, quantity: 20},
  {step_id: 4, ingredient_id: 3, quantity: 1.5}
]

const steps = [
  {step_text: 'Boil water', step_number: 1, recipe_id: 1},
  {step_text: 'Put in pasta and let cook', step_number: 2, recipe_id: 1},
  {step_text: 'Rinse pasta, pour in tomato sauce while stirring', step_number: 3, recipe_id: 1},
  {step_text: 'Sprinkle oregano over', step_number: 4, recipe_id: 1},
]

exports.seed = async function(knex){
  await knex('recipes').insert(recipes)
  await knex('ingredients').insert(ingredients)
  await knex('steps').insert(steps)
  await knex('step_ingredients').insert(step_ingredients)
}