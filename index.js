const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // use the Model.create method and pass the recipe details as an object - then console.log the title of the recipe
    Recipe.create(data[0])
      .then(recipe => console.log("A recipe was created:", recipe.title))
      .catch(error => console.error("An error occurred", error));
  })
  .then(() =>{
    // Use insertMany to add the entire array to the database, then print the title of each recipe
    Recipe.insertMany(data)
      .then(insertedRecipes => {
        console.log("All the recipes are here:", insertedRecipes.map(recipe => recipe.title))
      })
      .catch(error => console.error("An error occurred.", error));
  })
  .then(
    // Update the Rigatoni's recipe
    Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100},
      {new: true},
    )
      .then(updatedRecipe =>{
        if (updatedRecipe){
          console.log("A recipe was updated:", updatedRecipe.title, ".New duration: ", updatedRecipe.duration);
        } else {
        console.log("Recipe not found.")};
      })
      .catch(error =>{
        console.log("Error updating the recipe.", error);
      })
  )
  .then(
  // Delete the Carrot cake recipe
    Recipe.findOneAndDelete(
      {title: 'Carrot Cake'},
      {new: true},
    )
      .then(deletedRecipe =>{
        if (deletedRecipe) {
          console.log("A recipe was deleted:", deletedRecipe.title)
        } else {
          console.log("Recipe not found.")};
        })
      .catch(error => {
        console.log("Error deleting the recipe.", error);
      })
  )

// closing the connexion:

process.on('SIGINT', () =>{
  mongoose.connection.close(() =>{
    console.log("Mongoose default connection disconnected through app terminal.");
    process.exit(0);
    });
})
