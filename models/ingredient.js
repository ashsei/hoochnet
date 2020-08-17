const mongoose = require('mongoose');

const ingredientItemSchema = new mongoose.Schema({
    itemName: String ,
    userId: String
});

const IngredientItem = mongoose.model('IngredientItem', ingredientItemSchema);

module.exports = IngredientItem;