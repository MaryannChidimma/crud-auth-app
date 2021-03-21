let tokenDecoder =  require('./authTokenGenerator')
let User = require('../models/userModel')
exports.authenticateUser = async (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        tokenDecoder.decodeToken(token).then(decoded => {
            User.findOne({ _id: decoded.user_data.user_id }).then(data => {
                if (data == null) {
                    res.status(404).send({ success: false, message: "User does not exist" });
                } else {
                    req.auth = {
                        email: data.email,
                        fullname: data.fullname,
                        Id: data._id,
                        phonenumber: data.phone_number,
                        usertype:data.usertype
                    }
                    res.locals.response = { data: decoded, message: "", success: true };
                    next();
                }
            })
        }).catch(err => {
            res.status(401).send({ success: false, message: "Invalid token", "error_no": 8, data: err });
        })
    } else {
        res.status(401).send({ success: false, message: "No token provided", "error_no": 6 });
    }
};
