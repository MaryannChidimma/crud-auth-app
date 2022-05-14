const productCtrl = require('../controllers/product');
const router = require('express').Router();
const { Validator } = require("../validators")
const { addProductSchema, queryProductsSchema, idValidation } = require("../validators/productSchema")


module.exports = function () {
    router.post('/product', Validator(addProductSchema, "body"), productCtrl.addProduct);
    router.get('/product/get-all', Validator(queryProductsSchema, "query"), productCtrl.getAllProducts)
    router.delete('/product/:id', Validator(idValidation, "params"), productCtrl.deleteProduct);

    return router;

}