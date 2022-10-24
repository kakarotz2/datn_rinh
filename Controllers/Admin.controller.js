let OrderModel = require('./../Models/order.model');
const Product = require('./../Models/products.model');
const UserModal = require('./../Models/user.model');
const dotenv = require('dotenv');
dotenv.config();
const getQuantity = async (req, res, next) => {
    var qorder;
    var qpro;
    await Product.collection
        .find()
        .count()
        .then((data) => {
            qpro = data;
        });
    await OrderModel.collection
        .find()
        .count()
        .then((data) => (qorder = data));
    await UserModal.collection
        .find()
        .count()
        .then((data) => {
            res.json({
                qorder: qorder,
                qpro: qpro,
                quser: data,
            });
        });
};
const getNewProduct = async (req, res, next) => {
    Product.find({ category: 'new' })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};
const getConverseProduct = async (req, res, next) => {
    Product.find({ category: 'iphone' })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};

const getVansProduct = async (req, res, next) => {
    Product.find({ category: 'samsung' })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};
const getAccessoriesProduct = async (req, res, next) => {
    Product.find({ category: 'accessories' })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};

const getOrder = (req, res, next) => {
    OrderModel.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};
const getUser = (req, res, next) => {
    UserModal.find()
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            res.json(err);
        });
};
const addProduct = (req, res, next) => {
    let { name, url, price, type, category } = req.body;
    Product.create({ name, url, price, type, category })
        .then(() => {
            res.json({ msg: 'Thêm sản phẩm thành công!' });
        })
        .catch((err) => {
            res.json({ msg: 'Thêm sản phẩm thất bại!' });
        });
};
const updateProduct = (req, res, next) => {
    let { id, name, url, price } = req.body;
    Product.findByIdAndUpdate({ _id: id }, { name: name, url: url, price: price })
        .then(() => res.json({ msg: 'Cập nhật sản phẩm thành công!' }))
        .catch((err) => res.json({ msg: err }));
};
const deleteProduct = (req, res, next) => {
    Product.deleteOne({ _id: req.body.id })
        .then((data) => {
            res.json({ msg: 'Xóa sản phẩm thành công!' });
        })
        .catch((err) => res.json({ msg: 'Xóa sản phẩm thất bại!' }));
};
const updateOrder = async (req, res, next) => {
    let { idOrder, idProduct, name, url, price, email, address, note, phoneNumber, quantity, size, status, username } =
        req.body;
    await OrderModel.updateOne(
        { _id: idOrder },
        {
            name: username,
            email: email,
            status: status,
            phoneNumber: phoneNumber,
            note: note,
            address: address,
        },
    );
    OrderModel.updateOne(
        { _id: idOrder, 'product.id': idProduct },
        {
            $set: {
                'product.$.name': name,
                'product.$.url': url,
                'product.$.price': price,
                'product.$.amount': quantity,
                'product.$.size': size,
            },
        },
    )
        .then(() => {
            res.json({ msg: 'Cập nhật thành công !' });
        })
        .catch(() => res.json({ msg: 'Cập nhật thất bại !' }));
};

const updateUser = (req, res, next) => {
    let { id, name, email, role } = req.body;
    UserModal.updateOne(
        { _id: id },
        {
            firstName: name,
            lastName: '',
            email: email,
            role: role,
        },
    )
        .then(() => res.json({ msg: 'Cập nhật thành công!' }))
        .catch(() => res.json({ msg: 'Cập nhật thất bại' }));
};
const deleteUser = (req, res, next) => {
    let { id } = req.body;
    UserModal.deleteOne({ _id: id })
        .then(() => res.json({ msg: 'Xóa thành công!' }))
        .catch(() => res.json({ msg: 'Xóa thất bại' }));
};
const deleteOrder = (req, res, next) => {
    let { id } = req.body;
    OrderModel.deleteOne({ _id: id })
        .then(() => res.json({ msg: 'Xóa thành công!' }))
        .catch(() => res.json({ msg: 'Xóa thất bại' }));
};
/* ////////////////////////////// */
module.exports = {
    getQuantity,
    getNewProduct,
    getConverseProduct,
    getAccessoriesProduct,
    getVansProduct,
    getOrder,
    getUser,
    addProduct,
    updateProduct,
    deleteProduct,
    updateOrder,
    updateUser,
    deleteUser,
    deleteOrder,
};
