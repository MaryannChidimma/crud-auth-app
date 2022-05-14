
const Product = require('../models/product');
const catchErrorHandler = require("../utils/catchErrorHandler");

class ProductService {
    async addProduct(data) {

        //check if Product is already exists
        let isProduct = await Product.findOne({ name: data.name })
        if (isProduct) {
            return { "data": { "success": false, "message": "Product exist already." }, "statusCode": 409 }
        }
        else {
            const product = await Product.create(data)

            return { "data": { "success": true, "message": `You have successfully created a product`, product }, "statusCode": 201 }
        }
    }

    async getAll(query) {
        try {
            let queryObject = {};
            if (query.search) {
                let theSearchRegex = new RegExp(query.search, "ig");
                queryObject["$or"] = [
                    { name: theSearchRegex },
                    { description: theSearchRegex },
                ];
            }
            console.log(queryObject)
            const products = await Product.find(queryObject)
            return { "data": { "success": true, "message": `All products gotten successfully`, products }, "statusCode": 200 }
        }
        catch (err) {
            return catchErrorHandler.errorHandler(err, "Something went wrong.")
        }

    }

    async findOne(id) {

        try {
            const product = await Product.findById(id)

            if (!product) {
                return { "data": { "success": true, "message": `Product does not exist`, product }, "statusCode": 400 }
            }
            else {
                if (!product) {
                    return { "data": { "false": true, "message": `product gotten successfully`, product }, "statusCode": 200 }
                }
            }
        }
        catch (err) {
            return catchErrorHandler.errorHandler(err, "something went wrong, Could not find Product, try again. ")
        }
    }
    async deleteOneAndReturnAllProducts(id) {

        try {
            await Product.remove({ _id: id })
            const allProducts = await Product.find()
            return { "data": { "success": true, "message": `Product is successfully deleted`, allProducts }, "statusCode": 200 }
        }
        catch (err) {
            return catchErrorHandler.errorHandler(err, "Could not delete Product, try again.")
        }

    }
}



module.exports = module.exports = new ProductService();
