const express = require('express');
const CarsController = require('../controllers/CarsController');
const Router = express.Router();

Router.get('/', CarsController.getAllCars);
Router.get('/cars', CarsController.getAllCars);
Router.get('/cars/(:id)', CarsController.getCar);
Router.get('/reset-session', CarsController.resetSession);

module.exports = Router;