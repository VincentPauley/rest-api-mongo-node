const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let IngredientSchema = new Schema({
    name: { type: String, required: true, max: 60 },
    category: { type: String, required: true, max: 25 }
});

// export model for use
module.exports = mongoose.model( 'Ingredient', IngredientSchema );