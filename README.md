
# Channiboi MVC

Hello, I'm Christian Verzosa. This is my custom MVC named Channiboi Framework, a framework entry created in NodeJS & Express. There are a lot of areas that need to be improved upon. I will be updating this framework from time to time.

---

I have created a simple web application using my MVC. The project is named "Sports Player Lookup". The purpose of mine in creating this mini-app project is for you to learn how things connect to each other on my custom MVC, and also to help understand how AJAX can be used on my Express app.


You will find the sql file in the root folder directory.

---

Things to know before using the Channiboi MVC Framework:
- This MVC uses EJS as the default view engine.
- This MVC is using the mysql2 third-party module, which means that by default we are using the msyql database.
- I'm using nodemon while creating the Channiboi Framework.
- This MVC, although not required, encourages people to follow the Skinny Controller-Fat Model approach. What this encourages is to move most of your logic into your model.

---
## Run application in browser

I am using Nodemon by default while creating this custom MVC. In your terminal, access the root directory of your project and run the following commands:

```bash
   nodemon app.js
```
Now go to your browser and type localhost:8000. You can then go to the app.js to change the port number to whatever you want.

---

## Default Folder Structure

### Assets
I'm using the Express Static functionality for the rendering of your static content. Static contents are CSS, JS, and images that are typically rendered statically on the front end. (i.e. bootstrap CSS and/or JS, jQuery and images). You can insert it in the application > assets folder.

### Node Modules
I mentioned earlier that we are using NodeJS-Express in creating the Channiboi framework. This folder stores all of your node modules and third-party node modules.

### System
This folder contains 3 folders named config, core, and helpers.

### System - Config
Under this folder, you will see a config json file where you can declare your database credentials.

### System - Core
This is the folder that I would not encourage you to touch. By default, you will see the database.js file, which handles our connection to our database. You will also see ChanniboiController and ChanniboiModel, which are actually the main controller and model of this custom MVC.

### System - Helpers
I have specifically created this helper folder for you to create your helper files. By default, I have created a ChannibiFormValidation helper that can validate fields on your form.

### Application
This is the folder where most of your files and folders will be placed. For example, your Model, View, Controllers, and Routes folders.

### Application - Routes
This is the folder where we create JS files that declare routes towards the specific controller.

### Application - Views
This is the folder where we insert our view files. As previously mentioned, we are using Express as a default view engine for our MVC.

### Application - Controller
The controller folder is where we store our controllers. This is just a typical folder to see in an MVC. What the controller does is: it determines what response to send back to a user when a user makes a browser request.

### Application - Models
This is the folder where we create our models. It is also just a typical folder that we see in an MVC. What models do is: the model classes represent domain-specific data and business logic in the MVC application. Most of the developers that use MVC (whether it be CodeIgniter or Laravel) follow the skinny-controller, fat-model approach. We encourage you to store most of your logic in a model.

---

## How To Use
1. what is `app.js`?
- This is the setup file of our application. This is where we create the app (i.e. app.use) and declare the server. This is essential in every node application.

2. How to create a route? 
- You need to create a .js file under your routes folder. For example, SportsPlayers.js. You can follow this template for your route file:

    ```JS
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
    ```

3. What are the main-core Controllers and Models? 
- Under the system > core folder, we have these 2 files called ChanniboiController and ChanniboiModel. These are the parent files that you can extend. These files also have predefined features:

    A. ChanniboiController
    - This is the file that you should extend when you are creating a controller. This file has the following methods:

        - load_view: This method should accept request, response, view_path and the data. This method is responsible for displaying view templates.
        - load_json: This method should accept 3 parameters, which are the request, response and the data which is the json_data that will be passed.
        -divert: This method should accept 3 parameters, which are the request, response and the url.

    B. ChanniboiModel
    - This is the file that you should extend when you are creating a model. This file has a custom query builder that you can use on your models.

    Note: I recommend that you look at these two files in the system > core folder to get a sense of how the Main Controller and Main Model work. However, I discourage you from touching these files. If you have suggestions on what to improve, feel free to contact me at christian.e.verzosa@gmail.com.


4. How do we create a controller? 
- Under the application > controller folder, you can create a controller.js file. There are some things that you need to declare on top of your controller file. Follow this template as a basis.

    ``` JS
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
    ```


5. How do we create model? 
- Under the application > model folder, you can create your model `.js` file. There are some things that you need to declare on top of your model file. Follow this template as a basis"

    ```JS
    /** Required: You must extend the MVC's `ChanniboiModel` when you are creating a controller **/
    const ChanniboiModel = require('../../system/core/ChanniboiModel');

    /** Required: You must export your model, to be used on your controller **/
    module.exports = class SportsPlayersModel extends ChanniboiModel {

        async fetch_players(request, response) {

            let query = '';

            /***
            * Had to do delete request.query.player_name if it is empty, it is for the next `If` Statement. Because if it is empty, node still includes it in the `request.query` object.
            * 
            * I will find a way on how to fix this in the future.
            */
            if (request.query.player_name === '') {
                delete request.query.player_name;
            }

            if (Object.keys(request.query).length != 0) {
                /***
                * Means that there is fields that the client searched (Wether it be an input field or checkbox)
                */

                let parameters = request.query;

                query += this.select(['CONCAT(players.first_name, " ", players.last_name) AS name', 'players.profile_image']);
                query += this.from('player_sports');
                query += this.join('INNER', 'players', 'player_sports.player_id = players.id');
                query += this.join('INNER', 'sports', 'player_sports.sport_id = sports.id');

                /***
                * Base on the mini project i am creating, I want to fetch players in an `or_where` settings.
                * For example: If both `Male` and `Female` checkboxes are checked, show males and females.
                */
                let or_where_conditions = [];

                if (parameters.player_name) {
                    or_where_conditions.push('players.first_name LIKE "%'+parameters.player_name+'%"');
                }

                if (parameters.gender) {
                    if (typeof(parameters.gender) === 'string') {
                        or_where_conditions.push('players.gender LIKE "'+parameters.gender+'"');
                    } else {
                        for (let i=0; i<parameters.gender.length; i++) {
                            or_where_conditions.push('players.gender LIKE "'+parameters.gender[i]+'"');
                        }
                    }
                }

                if (parameters.sports) {
                    if (typeof(parameters.sports) === 'string') {
                        or_where_conditions.push('sports.sport_name LIKE "'+parameters.sports+'"');
                    } 
                    else {
                        for (let i=0; i<parameters.sports.length; i++) {
                            or_where_conditions.push('sports.sport_name LIKE "'+parameters.sports[i]+'"');
                        }
                    }
                }

                query += this.or_where(or_where_conditions);
                query += this.group_by('player_sports.player_id');

            } else {
                /***
                * Means that there are no search fields inputted by the client. Just fetch all players.
                */
                query += this.select(['CONCAT(players.first_name, " ", players.last_name) AS name', 'players.profile_image']);
                query += this.from('player_sports');
                query += this.join('INNER', 'players', 'player_sports.player_id = players.id');
                query += this.join('INNER', 'sports', 'player_sports.sport_id = sports.id');
                query += this.group_by('player_sports.player_id');

            }

            try {
                /***
                * Had to do 2 returns, for best practice
                */
                let [result] = await this.run(request, response, query);
                return new Promise((resolve, reject) => {
                    resolve(result);
                });
            } catch (errors) {
                return new Promise((resolve, reject) => {
                    reject(errors);
                });
            }
            

        }

    }
    ```