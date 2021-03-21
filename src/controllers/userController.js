
const UserService = require("../services/userService.js");


class  userController{
  async register(req, res) {
      const result = await UserService.register(req.body);
      res.status(result.statusCode).json(result.data);
    }

  async login(req, res) {
    const result = await UserService.login(req.body);
      res.status(result.statusCode).json(result.data);
  }

  async updateUser(req, res){
  
      const result = await UserService.updateUser(req.auth.Id, req.body)
      res.status(result.statusCode).json(result.data);
    }

  async deleteUser(req, res){
    
      const result = await UserService.deleteUser(req.params.userId, req.body) 
      res.status(result.statusCode).json(result.data);
    }
   
  
}


module.exports = new userController();