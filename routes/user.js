const express = require('express');
const router=express.Router();

const userControllers=require('../controllers/user');

router.get('/register', userControllers.renderRegisterPage);
router.post('/register', userControllers.registerUser);

router.post('/login', userControllers.loginUser);
router.get('/login', userControllers.renderLoginPage);

router.get('/logout', userControllers.logoutUser);