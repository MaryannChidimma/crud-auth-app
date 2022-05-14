
const product = require("../routes/product");
const ProductService = require("../services/products");


class ProductController {
    async addProduct(req, res) {
        const result = await ProductService.addProduct(req.body);
        res.status(result.statusCode).json(result.data);
    }

    async getAllProducts(req, res) {
        const result = await ProductService.getAll(req.query);
        res.status(result.statusCode).json(result.data);
    }

    async deleteProduct(req, res) {
        const isExist = await ProductService.findOne(req.params.id)

        if (!isExist.data.product) {
            res.status(isExist.statusCode).json(isExist.data);
        }
        const result = await ProductService.deleteOneAndReturnAllProducts(req.params.id)
        res.status(result.statusCode).json(result.data);
    }

}

module.exports = new ProductController();