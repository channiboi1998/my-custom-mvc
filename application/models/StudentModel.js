const Database = require('../util/database');
const { Validator } = require('node-input-validator');
const bcrypt = require('bcryptjs');
const Query = require('../util/querybuilder');

/***
 * This method is for validating the fields on the `student login` form
 */
const validate_login = (request) => {

    return new Promise((resolve, reject) => {

        let data = {
            'status': '', 
            'message': '',
        };
    
        const form = new Validator(request.body, {
            email_address: 'required|email',
            password: 'required',
        });
    
        form.check().then((matched) => {
            if (!matched) {
                data['status'] = 422;
                data['message'] = form.errors;
                reject(data);
            } else {
                data['status'] = 200;
                data['message'] = 'Successfully Login';
                
                resolve(data);
            }
        });
    });

}

/***
 * This method is for processing `student login` form
 */
const process_login = (request) => {
    return new Promise( async (resolve, reject) => {

        let fields = request.body;

        let data = {
            'status'    : '',
            'message'   : '',
        };

        let querybuilder = new Query();
        let query = querybuilder.select().from('students').where(['email_address = ?']).create_query();
        let [result] =  await Database.execute(query, [fields.email_address]);
        if (result.length) {
            let user = result[0];
            let database_password = result[0].password;
            if (bcrypt.compareSync(fields.password, database_password)) {
                data['user'] = user;
                data['status'] = 200,
                data['message'] = {'success_login': {'message': 'Successfully logged in'}};
                resolve(data);
            } else {
                data['status'] = 422,
                data['message'] = {'failed_login': {'message': 'Your password and email does not match'}};
                reject(data);
            }
        } else {
            data['status'] = 422,
            data['message'] = {'failed_login': {'message': 'Email does not exist on the database'}};
            reject(data);
        }

    });
}

/***
 * This method is for validating the  fields on `student registration` form
 */
const validate_register = (request) => {
    
    return new Promise((resolve, reject) => {

        let data = {
            'status'    : '',
            'message'   : '',
        };
    
        const form = new Validator(request.body, {
            first_name          : 'required',
            last_name           : 'required',
            email_address       : 'required|email',
            password            : 'required',
            confirm_password    : 'required|same:password',
        });
        
        form.check().then((matched) => {
            if (!matched) {
                data['status'] = 422,
                data['message'] = form.errors,
                reject(data);
            } else {
                data['status'] = 200;
                data['message'] = {'forms_valid': {'message': 'All forms are valid'}};
                resolve(data);
            }
        });

    });
}

/***
 * This method is for processing the `student form` registration
 */
const process_register = (request) => {

    let fields = request.body;

    let data = {
        'status': '',
        'message': '',
    };

    return new Promise( async (resolve, reject) => {
        let querybuilder = new Query();
        let query = querybuilder.select().from('students').where(['email_address = ?']).create_query();
        let [result] = await Database.execute(query, [fields.email_address]);
        if (result.length) {
            data['status'] = 422,
            data['message'] = {'email_exists': {'message': 'Email address already exists'}};
            reject(data);
        } else {
            /***
             * Waa mentally tired na, will create this queries on querybuilder later
             */
            let query = "INSERT INTO `students` (`first_name`, `last_name`, `email_address`, `password`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, NOW(), NOW())";
            await Database.execute(query, [
                fields.first_name,
                fields.last_name,
                fields.email_address,
                bcrypt.hashSync(fields.password, 10),
            ]);
            data['status'] = 200;
            data['message'] = {'successful_register': {'message': 'Successfully Regsitered a new user'}};
            resolve(data);
        }
    });

}

/***
 * This method is for fetching a single record
 */
const fetch_student_by_email = (email_address) => {
    
    let data = {
        'status': '',
        'message': '',
    };

    return new Promise( async (resolve, reject) => {
        let querybuilder = new Query();
        let query = querybuilder.select().from('students').where(['email_address = ?']).create_query();
        let [result] = await Database.execute(query, [email_address]);
        if (result.length) {
            data['user'] = result[0];
            data['status'] = 200;
            data['message'] = {'user_found': {'message': 'Found the user in the database'}};
            resolve(data);
        } else {
            data['status'] = 422,
            data['message'] = {'user_not_found': {'message': 'Could not found user on the database'}};
            reject(data);
        }
    });

}

module.exports = { validate_login, process_login, process_register, validate_register, fetch_student_by_email };