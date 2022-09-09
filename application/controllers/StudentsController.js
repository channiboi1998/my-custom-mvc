const ChanniboiController = require('../util/ChanniboiController');
const StudentModel = require('../models/StudentModel');

class StudentsController extends ChanniboiController {

    /***
     * This method is for showing the login/registration for students
     */
    login_register(request, response) {
        if (request.session.email_address) {
            return this.divert(request, response, '/students/profile');
        }
        let data = {
            'page_title': 'Registration',
        };
        return this.load_view(request, response, 'students/login-register', data);
    }

    /***
     * This method is for showing the student his/her profile
     */
    async student_profile(request, response) {
        if (request.session.email_address) {
            try {
                let result = await StudentModel.fetch_student_by_email(request, response, request.session.email_address);
                let data = {
                    'user': result.user,
                };
                return this.load_view(request, response, 'students/student-profile', data);
            } catch(error) {
                return this.divert(request, response, '/');
            }
        } else {
            return this.divert(request, response, '/');
        }
    }

    /***
     * This method is for student when they logout
     */
    logout(request, response) {
        request.session.email_address = null;        
        return this.divert(request, response, '/');
    }

    /***
     * This method is hadnling the student-login event
     */
    async login(request, response) {
        try {
            let result;
            result = await StudentModel.validate_login(request, response);
            result = await StudentModel.process_login(request, response);
            request.session.email_address = result.user.email_address;
            return this.load_json(request, response, result);
        } catch(errors) {
            return this.load_json(request, response, errors);
        }
    }

    /***
     * This method is hadnling the student-registration event
     */
    async register(request, response) {
        try {
            let result;
            result = await StudentModel.validate_register(request, response);
            result = await StudentModel.process_register(request, response);
            return this.load_json(request, response, result);
        } catch (error) {
            return this.load_json(request, response, error);
        }        
    }
}

module.exports = new StudentsController();