const Ingredient = require('../models/ingredient.model');

exports.all_ingredients = function( req, res ) {

    Ingredient.find({}, { name: 1 }, function(err, ingredients) {

        if( err ) {
            res.send(err);
        }

        res.send( ingredients );
    })
}

exports.find_by_id = function( req, res ) {

    Ingredient.findOne({ _id: req.params.id }, function( err, ingredient ) {

        if( err ) {
            res.send( err )
        }

        res.send( ingredient )
    })
}
// fix errant statuses for API
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

exports.delete_ingredient = function( req, res ) {

    // TODO: will need a consistent helper like this for any request providing an ID
    // verify proper mongoID was passed in before attempting delete
    if( !/^[0-9a-fA-F]{24}$/.test( req.params.id ) ) {
        return res.status(400).send({
            message: 'Invalid item ID, cannot delete'
        })
    }

    Ingredient.deleteOne({ _id: req.params.id }, function( err ) {

        if( err ) {

            console.log( err ); // << TODO: do some actual logging with this

            res.status(500).send({
                message: 'Server failed to delete item'
            });
        } else {
            res.send( 'Server has Deleted: ' + req.params.id );
        }
    })
}