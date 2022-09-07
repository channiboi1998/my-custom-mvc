const StudentModel = require('../models/StudentModel');

class StudentsController {

    /***
     * This method is for showing the login/registration for students
     */
    login_register(request, response) {

        let data = {
            'page_title': 'Registration',
        };
        response.render('students/login-register', {data:data});

    }

    /***
     * This method is for showing the student his/her profile
     */
    async student_profile(request, response) {
        
        if (request.session.email_address) {
            try {
                let result = await StudentModel.fetch_student_by_email(request.session.email_address);
                let data = {
                    'user': result.user,
                };
                response.render('students/student-profile', {data:data});
            } catch(error) {
                response.redirect('/');
            }
        } else {
            response.redirect('/');
        }
    }

    /***
     * This method is for student when they logout
     */
    logout(request, response) {
        request.session.email_address = null;        
        response.redirect('/');
    }

    /***
     * This method is hadnling the student-login event
     */
    async login(request, response) {
        try {
            let result;
            result = await StudentModel.validate_login(request);
            result = await StudentModel.process_login(request);
            request.session.email_address = result.user.email_address;
            response.json(result);
        } catch(errors) {
            response.json(errors);
        }
    }

    /***
     * This method is hadnling the student-registration event
     */
    async register(request, response) {
        try {
            let result;
            result = await StudentModel.validate_register(request);
            result = await StudentModel.process_register(request);
            response.json(result);
        } catch (error) {
            response.json(error);
        }        
    }

}

module.exports = new StudentsController();