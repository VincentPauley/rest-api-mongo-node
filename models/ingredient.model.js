const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

let IngredientSchema = new Schema({
    name: { type: String, required: true, max: 60 },
    category: { type: String, required: true, max: 25 },
    parent: { type: Schema.Types.ObjectId, required: false },
    description: { type: String, required: false, max: 300 },
    valid_measurements: [{name: String}],
    added_on: { type: String, min: 10, max: 10, required: true },
    created_by: { type: String, required: true, max: 14 },
    last_modified_by: { type: String, required: true, max: 14  }
});

// export model for use
module.exports = mongoose.model( 'Ingredient', IngredientSchema );