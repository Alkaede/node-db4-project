const router = require('express').Router();
const Recipe = require('./recipes-model');

router.get('/', (req, res, next) => {
  Recipe.getAll()
    .then(recipe => {
      res.status(200).json(recipe)
    })
    .catch(next)
})

router.get('/:recipe_id', (req, res, next)=> {
  const {recipe_id} = req.params
  Recipe.getRecipeById(recipe_id)
    .then((recipe) => {
      if(recipe){
        res.status(200).json(recipe)
      }else{
        res.status(404).json({message: 'Recipe not found'})
      }
    })
    .catch(next)
})


router.use((err, req, res, next)=> { 
  res.status(500).json({
  serverMessage: 'Something went wrong in the recipes router',
  message: err.message,
  stack: err.stack
})
})

module.exports = router