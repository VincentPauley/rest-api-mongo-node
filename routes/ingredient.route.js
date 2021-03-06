const express = require('express');
const router = express.Router();

const ingredient_controller = require('../controllers/ingredient.controller');

router.post( '/add', ingredient_controller.add_ingredient );

router.get( '/list', ingredient_controller.all_ingredients );

router.get( '/distinct_categories', ingredient_controller.distinct_categories );

router.get( '/id/:id', ingredient_controller.find_by_id );

router.delete( '/:id', ingredient_controller.delete_ingredient );


module.exports = router;