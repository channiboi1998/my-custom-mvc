/** Required: You must extend the MVC's `ChanniboiController` when you are creating a controller **/
const ChanniboiController = require('../../system/core/ChanniboiController');

/** Required: Import your Model **/
const Model = require('../models/SportsPlayersModel');
/** Required: Create an Instance of your Model to be used on this controller **/
const SportsPlayersModel = new Model();

/** Required: You must export your controller, to be used on routes **/
module.exports = class SportsPlayersController extends ChanniboiController {

    /***
     * This is for the homepage. By default, we are fetching all of the `players` to display on the homepage.
     */
    async index(request, response) {

        let data = {
            'page_title': 'Sports Player Lookup',
        };

        try {
            /***
             * Note that on this part, we are using our model called `SportsPlayersModel` and it's method `fetch_players`.
             * It is a requirement for your controllers to pass the `request` and `response` towards your model.
             */
            let result = await SportsPlayersModel.fetch_players(request, response);
            data['players'] = result;
        } catch (errors) {
            console.log(errors);
        }

        /***
         * Note that on this part, we are using `load_view` method, a method that we inherited on our controller's parent controller (Channiboi Controller)
         */
        return this.load_view(request, response, 'index', data);
        
    }

    /***
     * This method handles the search functionality
     */
    async search(request, response) {

        let data = {};

        try {
            let result = await SportsPlayersModel.fetch_players(request, response);
            data['players'] = result;
            /***
             * Same on this part, wer are using the `load_json` method of our Parent's controller (Channoboi Controller)
             */
            return this.load_json(request, response, data);
        } catch(errors) {
            data['errors'] = errors;
            return this.load_json(request, response, data);
        }

    }

}