const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');

router.get('/users', userController.getUsers);
router.post('/login', userController.loginUser);


router.post('/signup', userController.createUser);


module.exports = router;
