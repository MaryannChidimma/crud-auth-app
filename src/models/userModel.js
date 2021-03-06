const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const UserSchema = mongoose.Schema({
    fullname: {
        type: String
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        match: /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/g
    },
    phone_number: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    usertype: {
        type: String,
        default: ""
    },
}
    , { timestamps: true });

UserSchema.pre("save", function (next) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
})

const User = mongoose.model('user', UserSchema)
module.exports = User;