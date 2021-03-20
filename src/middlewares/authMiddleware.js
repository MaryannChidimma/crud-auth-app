const jwt = require('jsonwebtoken');
//const CustomError = require('../../utils/custom.error');


module.exports = (req, res, next) => {
    const token =req.headers.authorization?.split(" ")[1];
    if(!token) {
        return {"data": {"success": false, "message": 'Access denied no token provided'},  "statusCode": 401}
    }
    try {
        const decoder = jwt.verify(token, process.env.JWT_KEY)
        req.admin = decoder;
        next();
    }
    catch (err) {
        next(err)
    };

};
