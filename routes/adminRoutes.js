const express=require('express')
const router=express.Router()
const adminController=require('../controller/adminController')


router.post('/adminLogin',adminController.adminLogin)

router.get('/getUsers/:input',adminController.getUsers)

router.get('/getAllUsers',adminController.getUsers)

router.delete('/deleteUser/:user_id',adminController.deleteUser)

router.post('/createUser',adminController.createUser)

router.get('/getUserDetails/:user_id',adminController.getUserDetails)

router.put('/editUser',adminController.editUser)


module.exports=router           