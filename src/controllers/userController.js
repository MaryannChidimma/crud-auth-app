
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

  async update(req, res){
  
      const result = await UserService.update(req.params.userId, req.body)
      res.status(result.statusCode).json(result.data);
    }

  async delete(req, res){
    
      const result = await UserService.delete(req.params.userId) 
      res.status(result.statusCode).json(result.data);
    }
   
  
}


module.exports = new userController();