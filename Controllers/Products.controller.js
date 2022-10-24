const Product = require('./../Models/products.model');
class ProductController {
    //GET ALL
    get(req, res) {
        Product.find({}, (err, product) => {
            if (!err) {
                res.json(product);
            } else {
                res.status(400).json('Error get data');
            }
        });
    }
    //GET by ID
    getbyID(req, res) {
        const id = req.params.id;
        Product.find({ _id: id }, (err, product) => {
            if (!err) {
                res.json(product);
            } else {
                res.status(400).json('Error get data');
            }
        });
    }
    //Get vans
    getVans(req, res) {
        Product.find({ category: 'vans' }, (err, product) => {
            if (!err) {
                res.json(product);
            } else {
                res.status(400).json('Error get data');
            }
        });
    }
    //get converse
    getConverse(req, res) {
        Product.find({ category: 'iphone' }, (err, product) => {
            if (!err) {
                res.json(product);
            } else {
                res.status(400).json('Error get data');
            }
        });
    }
    //get new
    getNew(req, res) {
        Product.find({ category: 'new' }, (err, product) => {
            if (!err) {
                res.json(product);
            } else {
                res.status(400).json('Error get data');
            }
        });
    }
    getAccessories(req, res) {
        Product.find({ category: 'accessories' }, (err, product) => {
            if (!err) {
                res.json(product);
            } else {
                res.status(400).json('Error get data');
            }
        });
    }
    getbySlug(req, res) {
        const { slug } = req.params;

        Product.find({ type: slug }, (err, category) => {
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(400).json('Err');
            }
        });
    }
    //Search
    searchProduct(req, res) {
        var term = req.query.query.toLowerCase();
        Product.find({ name: { $regex: term, $options: '$i' } }, (err, items) => {
            if (err) {
                res.json(err);
            } else {
                res.json(items);
            }
        });
    }
}
module.exports = new ProductController();
