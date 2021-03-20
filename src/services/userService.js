
const User = require('../models/userModel');
const bcrypt = require('bcrypt')
class UserService {
    async register(data) {
        const { fullname, email, password, phone_number } = data
       
        if(!fullname|| !email || !password || !phone_number){
        return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": "fullname, email, password, phone_number"}, "statusCode": 417}
        }
        //check if user is already registered
        let isUser = await User.findOne({ email: email })
        if(isUser){
        return {"data": {"success": false, "message": "Email is already registered with us."}, "statusCode": 409}
        }
        else{
             const user =  await new User({
                 fullname,
                 email,
                 password,
                 phone_number,
                 usertype: "user"
                  }).save();
                
            return {"data":{ "success": true, "message": `You have successfully signed up`, user}, "statusCode": 201 }
         }
        
     
    }

        async login(data) {
          const { email, password } = data
          if (!email || !password){
            return {"data": {"success": false, "message": 'Request failed due to all required inputs were not included', "required inputs": " email, password"}, "statusCode": 417}
          }  
          //check if user exist
           const user = await User.findOne({email});
          if (!user){
            return {"data": {"success": false, "message": "Email does not exist"}, "statusCode": 404}
        }
         //compare password provided with password already in database
         const isMatch = await bcrypt.compare(password, user.password)
          if (isMatch){
            const token = user.generateAuthToken();
            return {"data": {"success": true, token }, "statusCode": 200}
            }
         else{
        return {"data": {"success": false, "message": "invalid Email or Password"}, "statusCode": 401}
         } 
      }

  async update(userId, data) {
    try{
    const {fullname, email, phone_number} = data;
   const user = await User.findOneAndUpdate(
    userId,
    data,
    { new: true }
   );
        
    
        if (!user){
          return {"data": {"success": false, "message": 'User does not exist'},  "statusCode": 404}
        } 
        return user;
      }
      catch(err){
          return {"data": {"success": false, "message": err.message}, statusCode: 500}
      }
    }
      async updatePassword(userId, data){
        
          const user = await User.findOne({ _id: userId });
          if (!user){
         return {"data": {"success": false, "message": 'User dose not exist'},  "statusCode": 404}
          }
          //Check if user password is valid
          const user_password = await bcrypt.compare(data.password, user.password)
          if (!user_password){
            return {"data": {"success": false, "message": 'Invalid Password'},  "statusCode": 401}
          }
          await User.updateOne(
            { _id: userId },
            { $set: {password : data.password} },
            { new: true })
      
          return 
      }
    
      async delete(id) {
        const user = await User.remove({ _id: id });
        return user
    }

    }
      module.exports = module.exports = new UserService();
