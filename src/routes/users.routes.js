const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/users/signup', usersController.renderSignUpForm);
router.post('/users/signup', usersController.signup);
router.get('/users/signin', usersController.renderSigninForm);
router.post('/users/signin', usersController.signin);
router.get('/users/logout', usersController.logout);
module.exports = router;
