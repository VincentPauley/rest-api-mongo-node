const express = require('express');
const router = express.Router();

const ingredient_controller = require('../controllers/ingredient.controller');

router.post( '/add', ingredient_controller.add_ingredient );

router.get( '/list', ingredient_controller.all_ingredients );

module.exports = router;