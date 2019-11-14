const express = require('express');
const router=express.Router();

const userControllers=require('../controllers/user');

router.get('/register', userControllers.renderRegisterPage);
router.post('/register', userControllers.registerUser);

router.post('/login', userControllers.loginUser);
router.get('/login', userControllers.renderLoginPage);

router.get('/logout', userControllers.logoutUser);

router.get('/resume/edit/:userId',userControllers.renderEditResumePage);
router.post('/resume/edit/:userId',userControllers.editResumePage);

router.get('/resume/:userId', userControllers.renderResume);

router.get('/:userId/resume',userControllers.rederResumeWithoutLogin);

module.exports=router;