const CarModel = require('../models/CarModel');

class CarsController {

    async getAllCars(request, response) {
        /***
         * Setup session here
         */
        if (request.session.count) {
            request.session.count = request.session.count + 1;
        } else {
            request.session.count = 1;
        }

        try {
            //Had to obstruct this, maybe find a way in the future on how to obsrtruct this (maybe using a node module?)
            let [cars] = await CarModel.getAllCars();
            let data = {
                'session_counter': request.session.count,
                'cars': cars,
            };
            response.render('cars-list', {data: data});
        } catch(error) {
            console.log('The error is', error);
            response.send('There is an error in `getAllCars` method');
        }

    }

    async getCar(request, response) {
        try {
            let [car] = await CarModel.getCar(request.params.id);
            let data = {
                'car': car[0],
            };
            response.render('single-car', {data: data});
        } catch (error) {
            response.send('Ther is an error on `getCar` method');
        }
    }

    resetSession(request, response) {
        request.session.count = 0;
        return response.redirect('/');
    }

}

module.exports = new CarsController();