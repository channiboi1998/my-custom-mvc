
# Channiboi MVC

Hello, I'm Christian Verzosa, this is my Custom MVC named `Channiboi Framework`, a framework entry created in NodeJS & Express. There are a lot of areas that needs to be improved on. I will be updating this framework from time to time.

Things to know before using the Channiboi MVC Framework:
- This MVC is using `EJS` as a default view engine.
- This MVC is using `mysql2` third-party module, which means that by default we are using `msyql` database. 
- I'm using `nodemon` while creating Channiboi Framework.
- This MVC although not required, but encourage people to follow `Skinny Controller-Fat Model` approach. What this encourage is to move most of your logics on your model.
---
## Run application in browser

While creating this custom MVC, I am using nodemon by default. In your terminal, access to root directory of your project and run the following commands:

```bash
   nodemon app.js
```
Now go to your browser and type `localhost:8000`. You can then go to the `app.js` to change the port number to what ever you want.

---

## Default Folder Structure

### Assets
I'm Using `Express Static` functionality for the rendering of your static contents. Static contents are those `CSS`, `JS`, `Images` that you would typically just render statically on the front-end. (i.e bootstrap CSS and/or JS, jQuery and images). You can insert it on the application > assets folder.

### Node Modules
I mentioned earlier that we are using NodeJS - Express in creating Channiboi framework. This folder stores all of your node module and third-party node modules.

### Application
This is the folder Where most of your files/folders will be placed. For example, your M-V-C Folders, Configs, Routes, Utils and etc.

### Application - Helpers
I have specifically created this helper folder, for you to create your helper files.  By default, I have created `ChanniboiFormValidation` helper that can validate fields on your form. 

Side Note: As much as possible, try to import and use your helpers (or logics overall) to your models to follow the skinny-controller, fat-model approach.

### Application - Config
Under this folder, you will see a `config` json file where you can declare your database credentials.

### Application - Core
This is the folder where I would no encourage you to touch. By default, you will see the `database.js` file, which handles our connection to our database.

### Application - Routes
This is the folder where we create js files, that declare routes towards the specific controller.

### Application - Views
It is the folder where we insert our `view` files. As previously mentioned, we are using `Express` as a default view engine for Channiboi Framework.

### Application - Controller
The controller folder is where we store our controllers, just a typical folder when we are using MVC. What the controller does is: It determines what response to send back to a user when a user makes a browser request.

### Application - Models
This is the folder where we create our models, also just a typical folder that we see in an MVC. What models do is: The model classes represents domain-specific data and business logic in the MVC application. Most of the developers that uses MVC (wether it be CodeIgniter or Laravel) follows the skinny-controller fat-model approach. We encourage you to store most of your logics to a model.

---

## How To Use
1. what is `app.js`?
- This is the `setup file` of our application. This is where we create the app (ie app.use) and the declare the server. This is essential in every node applications.

2. How to create a route? 
- You need to create a `.js` file under your routes folder. For example: `Students.js`. You can follow on this template for your route file:

    ```JS
    /** necessary: declaration of express module **/
    const express = require('express'); 
    /** necessary: to use Router functionality of express **/
    const Router = express.Router(); 
    /** import your Controller **/
    const StudentsController = require('../controllers/StudentsController'); 

    /** This is a simple example of a route. It is required to use `bind` so that you can get the object data **/
    Router.get('/', StudentsController.login_register.bind(StudentsController));

    /** and after creating your routes, export this file **/
    module.exports = Router;
    ```

3. What are the main-core Controllers and Models? 
- Under the application > core folder, we have this 2 files called `ChanniboiController` and `ChanniboiModel`. These are the parent files that you can extend, these files also have predefined features:

    A. ChanniboiController
    - This is the file that you should extend when you are creating a controller. This file has the following methods:

        - load_view: This method should accept `request`, `response`, `view_path` and the data. This method is responsible for displaying view templates.
        - load_json: This method should accept 3 parameters, which are the `request`, `response` and the `data` which is the json_data that will be passed.
        -divert: This method should accept 3 parameters, which are the `request`, `response` and the `url`.

    B. ChanniboiModel
    - This is the file that you should extend when you are creatin a model. This file has the custom query builder that you can use on your models.

    Note: I encourage you to check these 2 files under application > core folder, just to have an idea on how these Main Controller - Main Model work. However, I discourage you to touch these files. If you have suggestions on what to improve, feel free to contact me at christian.e.verzosa@gmail.com.


4. How do we create a controller? 
- Under the application > controller folder, you can create a controller `.js` file. There are some things that you need to declare ontop of your controller file. Follow this template as basis:

    ``` JS
    /** Required for your controller to extends  the main ChanniboiController **/
    const ChanniboiController = require('../core/ChanniboiController');
    /** Import your model **/
    const StudentModel = require('../models/StudentModel');

    class StudentsController extends ChanniboiController {
    
        /** This is an example method for showing the login/registration for students **/
        login_register(request, response) {
            if (request.session.email_address) {
                /** See that we are using `divert` method from parent `ChanniboiController` **/
                return this.divert(request, response, '/students/profile');
            }
            let data = {
                'page_title': 'Registration',
            };
            /** See that we are using `load_view` method from parent `ChanniboiController` **/
            return this.load_view(request, response, 'students/login-register', data);
        }

        /** On this method example, you can see that we are using the `StudentModel` and it's method `process_login`. NOTE that I made it a requirement to pass the request and response objects as part of the parameters. You can also see that we use `this.load_json` which is a method from the parent Controller `ChanniboiController` **/
        async login(request, response) {
            try {
                let result;
                result = await StudentModel.process_login(request, response);
                request.session.email_address = result.user.email_address;
                return this.load_json(request, response, result);
            } catch(errors) {
                return this.load_json(request, response, errors);
            }
        }

    }
    ```

5. How do we create model? 
- Under the application > modedl folder, you can create your model `.js` file. There are some thins that you need to declare ontop of your model file. Follow this template as basis:

    ```JS
    /** Required for your controller to extends the main ChanniboiModel **/
    const ChanniboiModel = require('../core/ChanniboiModel');
    /**  Not required, but this is also the part where you import your helpers. This is just a simple helper i created for validating the forms **/
    const CustomValidate = require('../helpers/ChanniboiFormValidation');
    /** Not required, but this is also the part where you import third-party modules, such as bcrypyt **/
    const bcrypt = require('bcryptjs');


    class StudentModel extends ChanniboiModel {

        /***
        * This example method is for processing `student login` form. 
        * You can also see on this example that we inehrited the methods from the parent model `ChanniboiModel` such as select(), from(), where() that is being used for building a query.
        */
        process_login = (request, response) => {
            return new Promise( async (resolve, reject) => {
                let fields = request.body;

                let data = {
                    'status'    : '',
                    'message'   : '',
                };

                let query = '';
                query += this.select();
                query += this.from('students');
                query += this.where(['email_address = ?']);
                let [result] =  await this.run(request, response, query, [fields.email_address]);
                if (result.length) {
                    let user = result[0];
                    let database_password = result[0].password;
                    if (bcrypt.compareSync(fields.password, database_password)) {
                        data['user'] = user;
                        data['status'] = 200,
                        data['message'] = ['Successfully logged in'];
                        resolve(data);
                    } else {
                        data['status'] = 422,
                        data['message'] = ['Your password and email does not match'];
                        reject(data);
                    }
                } else {
                    data['status'] = 422,
                    data['message'] = ['Email does not exist on the database'];
                    reject(data);
                }

            });
        }

    } 
    ```