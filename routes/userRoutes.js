const express=require('express')
const userController = require('../controller/userController')
const { verifyUser } = require('../middleware.js/verifyUser')
const multiUpload = require('../middleware.js/multer')
const adminController = require('../controller/adminController')
const router=express.Router()

router.post("/signUp", userController.userSignUP)

router.post('/login' , userController.userLogin)

router.post('/editProfile',multiUpload,userController.editProfile)

router.get('/getuserRefresh/:user_id',userController.getUserDetails)




module.exports=router