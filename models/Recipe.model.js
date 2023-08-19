const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: String, // required and unique
    level: String, // choice: Easy Peasy - Amateur Chef - UltraPro Chef
    ingredients: [String], // enum validation ??
    cuisine: String, // required
    dishType: String, // choice: breakfast, main_course, soup, snack, drink, dessert, other
    image: String,
    duration: Number, // min should be 0
    creator: String,
    Created: Date, // default = today
}
);

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

