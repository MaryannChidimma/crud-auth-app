
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
const catchErrorHandler = require("../utils/catchErrorHandler");
const authTokenGenerator = require('../middlewares/authTokenGenerator');

class UserService {
  async register(data) {
    try {
      const { fullname, email, password, phone_number } = data

      if (!fullname || !email || !password || !phone_number) {
        return { "data": { "success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "fullname, email, password, phone_number" }, "statusCode": 417 }
      }
      //check if user is already registered
      let isUser = await User.findOne({ email: email })
      if (isUser) {
        return { "data": { "success": false, "message": "Email is already registered with us." }, "statusCode": 409 }
      }
      const user = await new User({
        fullname,
        email,
        password,
        phone_number,
        usertype: "user"
      }).save();
      if (!user) {
        return { "data": { "success": false, "message": "We encountered an issue registering your account, try again." }, "statusCode": 500 }
      }

      const user_data = { "user_id": user._id, email: user.email, "fullname": user.fullname, "phone_number": user.phone_number, "usertype": user.usertype }
      return { "data": { "success": true, "message": `You have successfully signed up`, user_data }, "statusCode": 201 }
    }
    catch (err) {
      return catchErrorHandler.errorHandler(err, "Login failed, try again.")
    }
  }

  async login(data) {
    try {
      const { email, password } = data
      if (!email || !password) {
        return { "data": { "success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": " email, password" }, "statusCode": 417 }
      }
      //check if user exist
      const user = await User.findOne({ email: email });
      if (!user) {
        return { "data": { "success": false, "message": "Email does not exist" }, "statusCode": 404 }
      }
      const user_data = { "user_id": user._id, email: user.email, "fullname": user.fullname, "phone_number": user.phone_number, "usertype": user.usertype }

      //compare password provided with password already in database
      const isMatch = await bcrypt.compare(password, user.password)
      if (!isMatch) {
        return { "data": { "success": false, "message": "invalid Email or Password" }, "statusCode": 401 }
      }
      return authTokenGenerator.generateToken(user_data, 'login')

    }
    catch (err) {
      return catchErrorHandler.errorHandler(err, "Login failed, try again.")
    }
  }


  async updateUser(user_id, data){
    let { email, fullname, phone_number } = data
    if(!email || !fullname || !phone_number){
      return { "data": { "success": false, "message": "required details for updating were not specified"}, "statusCode": 417 }  
    }
    try {
        let updateUser = await User.findOneAndUpdate({ _id: user_id }, { $set: data }, {
          new: true,
          upsert: true
        })
        if (updateUser) {
          const user_data = { "user_id": updateUser._id, email: updateUser.email, "fullname": updateUser.fullname, "phone_number": updateUser.phone_number, "usertype": updateUser.usertype }
          return { "data": { "success": true, "message": 'Account was successfully updated', user_data }, "statusCode": 200 }
        }
        return { "data": { "success": false, "message": 'We encountered an error updating your account, try again.' }, "statusCode": 500 }

    }
    catch (err) {
      return catchErrorHandler.errorHandler(err, "User's data could not be updated, try again.")
    }

  }

  async deleteUser(user_id) {
    try {
        const user = await User.remove({ _id: user_id});
        return { "data": { "success": true, "message": 'Account successfully deleted.' }, "statusCode": 301 }
      
     }catch (err) {
      return catchErrorHandler.errorHandler(err, "Could not delete User, try again.")
    }
  }
}

module.exports = module.exports = new UserService();
