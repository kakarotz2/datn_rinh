const express=require('express')
const router=express.Router();
const {isAuth,isAdmin,isManager}=require('../until')
const AdminController=require('./../Controllers/Admin.controller')
router.get('/new',isAuth,isManager,AdminController.getNewProduct)
router.get('/converse',isAuth,isManager,AdminController.getConverseProduct)
router.get('/vans',isAuth,isManager,AdminController.getVansProduct)
router.get('/accessories',isAuth,isManager,AdminController.getAccessoriesProduct)
router.get('/user',isAuth,isManager,AdminController.getUser)
router.get('/order',isAuth,isManager,AdminController.getOrder)
//post
router.post('/addproduct',isAuth,isAdmin,AdminController.addProduct)
router.put("/updateproduct",isAuth,isAdmin,AdminController.updateProduct)
router.delete('/deleteproduct',isAuth,isAdmin,AdminController.deleteProduct)
//order
router.put('/updateorder',isAuth,isManager,AdminController.updateOrder)
router.put('/updateuser',isAuth,isAdmin,AdminController.updateUser)
router.delete('/deleteuser',isAuth,isAdmin,AdminController.deleteUser)
router.delete('/deleteorder',isAuth,isManager,AdminController.deleteOrder)
//get quantity all
router.get('/getall',isAuth,isManager,AdminController.getQuantity)
module.exports=router