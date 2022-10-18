let OrderModel = require("./../Models/order.model");
const dotenv = require("dotenv");
dotenv.config();
const getOrder = async (req, res, next) => {
  let {
    user,
    email,
    name,
    product,
    paymentMethod,
    phonenumber,
    address,
    note,
  } = req.body;
  const order = new OrderModel({
    user,
    email,
    name,
    product,
    paymentMethod,
    phonenumber,
    address,
    note,
  });
  order
    .save()
    .then(() => res.json({ message: "Mua hàng thành công" }))
    .catch((err) => {
      res.status(500).json({
        message: "Mua hàng thất bại",
      });
    });
};

module.exports = { getOrder };
