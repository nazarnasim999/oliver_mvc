const express = require('express');
const router = express.Router();
const userController = require('../app/controllers/userController');
const jobController = require('../app/controllers/jobController');

const auth = require('../middleware/auth');

router.get('/users', auth, userController.getUsers);
router.post('/userss', auth, userController.getUsers);

router.post('/login', userController.loginUser);
router.post('/updateuser',  userController.updateUser);



router.post('/signup', userController.createUser);


router.get('/getprofile',  userController.getprofile);
router.get('/getjobs',  jobController.getJobs);
router.get('/instructorjobs',  jobController.instructorjob);
router.post('/savejob',  jobController.SaveJob);
router.post('/applyjob',  jobController.Applyjob);
router.get('/getApplication',  jobController.getApplication);







module.exports = router;
