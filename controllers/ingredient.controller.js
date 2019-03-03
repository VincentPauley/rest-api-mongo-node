const Ingredient = require('../models/ingredient.model');

exports.all_ingredients = function( req, res ) {

    Ingredient.find({}, function(err, ingredients) {

        if( err ) {
            res.send(err);
        }

        res.send( ingredients );
    })
}

exports.add_ingredient = function( req, res ) {

    let ingredient = new Ingredient(
        {
            name: req.body.name,
            category: req.body.category 
        }
    );

    ingredient.save(function( err ) {

        if( err ) {
            res.send( err );
            return;
        }
        res.send('Product Created successfully');
    })
}