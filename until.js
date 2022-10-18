const UserModel=require('./Models/user.model')
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const getToken = (user) => {
  return jwt.sign(user, "hoang1995", {
    expiresIn: "48h",
  });
};
const isAuth = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.REACT_APP_JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ message: "Invalid Token" });
      }
      req.user = decode;
      next();
      return;
    });
  } else {
    return res.status(401).send({ message: "Token is not supplied." });
  }
};
const isManager=(req,res,next)=>{
  const id=req.cookies.userId
  UserModel.findOne({_id:id}).then(user=>{
    if(user&&user.role==='admin'){
      return next();
    }
    else if(user&&user.role==='manager'){
      return next();
    }
    else{
      return res.json({ msgErr: "Bạn không thể thực hiện hành động này !" });
    }
  })
}

const isAdmin = (req, res, next) => {
  const id=req.cookies.userId
  UserModel.findOne({_id:id}).then(user=>{
    if(user&&user.role==='admin'){
      return next();
    }
    else{
      return res.json({ msgErr: "Bạn không thể thực hiện hành động này !" });
    }
  })

};

module.exports = { getToken, isAuth, isAdmin,isManager };
