let UserModel = require('../Models/user.model')
const bcrypt=require('bcrypt')
let register=async (infoUser)=>{
    let {firstName,lastName,email,password}=infoUser
    let userOld= await UserModel.findOne({email:email})
    if(userOld){
        throw "Tài khoản đã tồn tại"
    }
    else{
        if(email&&password){
            const salt=bcrypt.genSaltSync(10)
            const hash=bcrypt.hashSync(password,salt)
            return UserModel.create({firstName,lastName,email,password:hash})
        }
        else{
            throw "Err"
        }
    }
}
let login=async (infoUser)=>{
    let {email,password}=infoUser
    let user=UserModel.findOne({email:email})
    if(user){
        bcrypt.compare(password,user.password).then(result=>{
            if(result){
                res.json({
                    message:"Đăng nhập thành công"
                })
            }
            else{
                res.json({
                    message:"Sai tài khoản hoặc mật khẩu"
                })
            }
        })
    }
    else{
        res.json({
            message:"Sai tài khoản hoặc mật khẩu"
        })
    }
}
module.exports={register,login}