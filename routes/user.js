const express=require('express')
const router=express.Router();
const {isAuth,isAdmin}=require('../until')
const UserController=require('./../Controllers/User.controller')
router.post('/register',UserController.registerUser)
router.post('/autologin',UserController.autoLogin)

router.post('/login',UserController.loginUser)
router.get('/account',isAuth,UserController.getInfo)
module.exports=router