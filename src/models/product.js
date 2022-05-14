const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const ProductSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product;