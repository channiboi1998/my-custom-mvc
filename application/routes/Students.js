const express = require('express');
const StudentsController = require('../controllers/StudentsController');
const Router = express.Router();

Router.get('/', StudentsController.login_register.bind(StudentsController));
Router.get('/students/profile', StudentsController.student_profile.bind(StudentsController));
Router.post('/student-login', StudentsController.login.bind(StudentsController));
Router.post('/student-register', StudentsController.register.bind(StudentsController));
Router.get('/logout', StudentsController.logout.bind(StudentsController));

module.exports = Router;