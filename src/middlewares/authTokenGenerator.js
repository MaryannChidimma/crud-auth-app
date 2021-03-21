
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_KEY;

exports.generateToken = async (user_data, situation) => {
  const authToken = await jwt.sign({ user_data }, secret, { expiresIn: "24hrs" })
  
  if(authToken){
    return {"data": {"success": true, "message": "Authorization successful.", "token": authToken, user_data, "situation": situation}, "statusCode": 200}
  }
  else{
    return {"data": {"success": false, "message": `There was an issue while signing you in, please try again.`, user_data, "situation": situation}, "statusCode": 422}
  }
  }


exports.getToken = async (token) => {
  const tokenResult = await jwt.verify(token, secret)
  return tokenResult
}

exports.decodeToken = (token = "")=> {
  return new Promise((resolve, reject) => {
      jwt.verify(token.replace("Bearer", ""), secret, function (
          err,
          decodedToken
      ) {
          if (err) {
              reject(err);
          } else {

              resolve(decodedToken);
          }
      });
  });
}
