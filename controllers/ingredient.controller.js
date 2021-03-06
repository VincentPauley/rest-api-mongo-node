const Ingredient = require('../models/ingredient.model');

exports.all_ingredients = function( req, res ) {

    Ingredient.find({}, { name: 1 }, function(err, ingredients) {

        if( err ) {
            res.send(err);
        }

        res.send( ingredients );
    })
}

exports.distinct_categories = function( req, res ) {

    Ingredient.find().distinct( "category", function( err, categories ) {

        if( err ) {
            res.send( err );
        }

        const allCategories = categories.map( c => c.toLowerCase() )

        // TODO: this should be done via an aggregate query rather than JS here
        let true_unique = [];

        allCategories.forEach( c => {

            if( true_unique.indexOf( c ) < 0 ) {
                true_unique.push( c );
            }
        });

        res.send( true_unique );
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
            category: req.body.category,
            description: req.body.description,
            added_on: new Date().toISOString().substring(0,10),
            created_by: req.body.created_by,
            last_modified_by: req.body.last_modified_by
        }
    );


    ingredient.save(function( err, result ) {

        if( err ) {

            console.log( err ); // < TODO: do something with this error

            return res.status(500)
                      .send({ message: 'server failed to create new ingredient' });
        }

        res.send({ message: 'successfully created new ingredient', id: result._id });
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