/** Required: Import `Express` Module **/
const express = require('express');
/** Required: Use `Express-Router` Functionality **/
const Router = express.Router();

/** Required: Import your Controller **/
const Controller = require('../controllers/SportsPlayersController');
/** Required: Create an Instance of your Controller to be used on creating routes **/
const SportsPlayersController = new Controller();

/** Create your routes **/
Router.get('/', SportsPlayersController.index.bind(SportsPlayersController));
Router.get('/search', SportsPlayersController.search.bind(SportsPlayersController));


/** Export `Router` to be used on app.js **/
module.exports = Router;