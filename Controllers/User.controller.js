let UserModel = require("./../Models/user.model");
let OrderModel = require("./../Models/order.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
let { register } = require("./../services/authService");
const autoLogin = (req, res, next) => {
  let  userId  = req.cookies.userId;
  UserModel.findOne({ _id: userId }).then((data) => res.json({user:data}));
};
const registerUser = async (req, res, next) => {
  try {
    let user = await register(req.body);
    let token = jwt.sign({ _id: user._id }, process.env.REACT_APP_JWT_SECRET, {
      expiresIn: "48h",
    });
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie("userId", user._id, { expires: 0 });
    return res.status(200).json({
      user,
      message: "",
    });
  } catch (err) {
    if (err) {
      return res.json({
        message: err,
      });
    }
  }
};
const loginUser = async (req, res, next) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password).then((result) => {
      if (result) {
        let token = jwt.sign(
          { _id: user._id },
          process.env.REACT_APP_JWT_SECRET,
          { expiresIn: "48h" }
        );
        res.cookie("userId", user._id, { expires: 0 });
        res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000 });
        res.json({
          user,
          message: "",
        });
      } else {
        res.json({
          message: "Sai tài khoản hoặc mật khẩu",
        });
      }
    });
  } else {
    res.json({
      message: "Sai tài khoản hoặc mật khẩu",
    });
  }
};
const getInfo = (req, res, next) => {
  let id = req.cookies.userId;
  OrderModel.find({ user: id })
    .populate("User")
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
};
module.exports = { registerUser, loginUser, getInfo, autoLogin };
