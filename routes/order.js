const express=require('express')
const router=express.Router()
const OrderController = require('./../Controllers/Order.controller')
router.post('/',OrderController.getOrder)
module.exports=router