const CustomValidate = require('../util/form-validation');
const bcrypt = require('bcryptjs');
const ChanniboiModel = require('../util/ChanniboiModel');

class StudentModel extends ChanniboiModel {
    /***
     * This method is for validating the fields on the `student login` form
     */
    validate_login = (request) => {

        return new Promise((resolve, reject) => {

            let data = {
                'status': '', 
                'message': '',
            };
        
            let form = new CustomValidate(request.body, {
                email_address: ['required', 'email'],
                password: ['required'],
            });

            let result = form.validate_each_fields();

            if (result.status === 422) {
                data['status'] = 422;
                data['message'] = result.message;
                reject(data);
            } else if (result.status === 200) {
                data['status'] = 200;
                data['message'] = result.message;
                resolve(data);
            }

        });

    }

    /***
     * This method is for processing `student login` form
     */
    process_login = (request) => {
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
            let [result] =  await this.database.execute(query, [fields.email_address]);
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

    /***
     * This method is for validating the  fields on `student registration` form
     */
    validate_register = (request) => {
        
        return new Promise((resolve, reject) => {

            let data = {
                'status'    : '',
                'message'   : '',
            };
            
            let form = new CustomValidate(request.body, {
                first_name          : ['required'],
                last_name           : ['required'],
                email_address       : ['required', 'email'],
                password            : ['required'],
                confirm_password    : ['required'],
            });

            let result = form.validate_each_fields();

            if (result.status === 422) {
                data['status'] = 422;
                data['message'] = result.message;
                reject(data);
            } else if (result.status === 200) {
                data['status'] = 200;
                data['message'] = result.message;
                resolve(data);
            }

        });
    }

    /***
     * This method is for processing the `student form` registration
     */
    process_register = (request) => {

        let fields = request.body;

        let data = {
            'status': '',
            'message': '',
        };

        return new Promise( async (resolve, reject) => {

            let query = '';
            query += this.select();
            query += this.from('students');
            query += this.where(['email_address = ?']);

            let [result] = await this.database.execute(query, [fields.email_address]);
            if (result.length) {
                data['status'] = 422,
                data['message'] = ['Email address already exists'];
                reject(data);
            } else {
                /***
                 *  Will create this queries on querybuilder later
                 */
                let query = "INSERT INTO `students` (`first_name`, `last_name`, `email_address`, `password`, `created_at`, `updated_at`) VALUES (?, ?, ?, ?, NOW(), NOW())";
                await this.database.execute(query, [
                    fields.first_name,
                    fields.last_name,
                    fields.email_address,
                    bcrypt.hashSync(fields.password, 10),
                ]);
                data['status'] = 200;
                data['message'] = ['Successfully Regsitered a new user'];
                resolve(data);
            }
        });

    }

    /***
     * This method is for fetching a single record
     */
    fetch_student_by_email = (email_address) => {
        
        let data = {
            'status': '',
            'message': '',
        };

        return new Promise( async (resolve, reject) => {

            let query = '';
            query += this.select();
            query += this.from('students');
            query += this.where(['email_address = ?']);

            let [result] = await this.database.execute(query, [email_address]);
            if (result.length) {
                data['user'] = result[0];
                data['status'] = 200;
                data['message'] = ['Found the user in the database'];
                resolve(data);
            } else {
                data['status'] = 422,
                data['message'] = ['Could not found user on the database'];
                reject(data);
            }
        });

    }
}

module.exports = new StudentModel();