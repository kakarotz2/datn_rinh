const mongoose = require('mongoose')
const UserSchema=mongoose.Schema({
    firstName:{
        type:String,
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'user'
    },
    password:{
        type:String,
        required:true
    }
})
const User =module.exports=mongoose.model('User',UserSchema)