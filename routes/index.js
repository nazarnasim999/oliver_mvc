const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const auth = require('../middleware/auth');

router.get('/users', auth, userController.getUsers);
router.post('/userss', auth, userController.getUsers);

router.post('/login', userController.loginUser);
router.post('/updateuser',  userController.updateUser);



router.post('/signup', userController.createUser);


router.get('/getprofile',  userController.getprofile);


router.post('/post_documents',userController.update_users_doc)


module.exports = router;
