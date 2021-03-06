const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Bag = require('../models/bagModel');
const Product = require('../models/productModel');
const productController = require('../controllers/productController');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.addProduct = function (req, res) {
    User.findById(req.params.id, req.body).then(function (user) {
        Bag.findByIdAndUpdate(user.bag).then(function (bag) {
            Product.findById(req.params.id_product, req.body).then(function (product) {
                bag.products.push(product);
                bag.cost += product.price;
                bag.save().then(function () {
                    Bag.findOne(user.bag).then(function (bagUpdated) {
                        res.send("The product was added to your bag. \n\n\n" + bagUpdated)
                    })

                });
            });
        });
    });
};

exports.getBagOfUser = function (req, res) {
    User.findById(req.params.id, req.body).then(function (user) {
        Bag.findById(user.bag).then(function (bag) {
            res.send("The product was added to your bag. \n\n\n" + bag)
        })
    })
};