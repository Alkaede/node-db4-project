const db = require('../../data/db-config');

const getAll = async () => {
  const recipes = await db('recipes')
  return recipes
}

const getRecipeById = async (recipe_id) => {
  const recipeRows = await db('recipes as r')
  // joining steps to recipes
  .leftJoin('steps as s', 'r.recipe_id','s.recipe_id')
  // joining step ingredients to steps now
  .leftJoin('step_ingredients as si', 'si.step_id', 's.step_id')
  // joining ingredients now to stepingr
  .leftJoin('ingredients as i', 'i.ingredient_id', 'si.ingredient_id')
  .select(
    'r.recipe_id', 
    'r.recipe_name',
    's.step_id',
    's.step_number',
    's.step_text',
    'i.ingredient_id',
    'i.ingredient_name',
    'si.quantity',
    'i.ingredient_unit'
  )
  .orderBy('s.step_number')
  .where('r.recipe_id', recipe_id)

    const recipes = {
      recipe_id : +recipe_id,
      recipe_name: recipeRows[0].recipe_name,
      // trying to condense steps in case of ingredients in similar steps
      steps: recipeRows.reduce((acc, row)=>{
        if(!row.ingredient_id){
          return acc.concat({
            step_id: row.step_id,
            step_number: row.step_number,
            step_text: row.step_text,
            ingredients: []
          })
          //logic for steps that have a new ingredient
        }if(row.ingredient_id && !acc.find(step => step.step_id === row.step_id)){
          return acc.concat({
            step_id: row.step_id,
            step_number: row.step_number,
            step_text: row.step_text,
            ingredients: [{ingredient_id: row.ingredient_id, ingredient_name: row.ingredient_name, quantity: row.quantity, unit: row.ingredient_unit}]
          })
        }
        //logic for steps that have the same ingredient
        const onStep = acc.find(step => step.step_id === row.step_id)
        onStep.ingredients.push({
          ingredient_id: row.ingredient_id,
          ingredient_name: row.ingredient_name,
          quantity: row.quantity,
          unit: row.ingredient_unit
        })
        return acc
      }, [])
    }

  return recipes
}

module.exports = {
  getAll,
  getRecipeById
}