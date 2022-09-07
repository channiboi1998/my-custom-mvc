const express = require('express');
const StudentsController = require('../controllers/StudentsController');
const Router = express.Router();

Router.get('/', StudentsController.login_register);
Router.get('/students/profile', StudentsController.student_profile);
Router.post('/student-login', StudentsController.login);
Router.post('/student-register', StudentsController.register);
Router.get('/logout', StudentsController.logout);

module.exports = Router;