const userCtrl = require('../controllers/userController');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware')
//require('express-async-errors')

module.exports = function () {
router.post('/users/register', userCtrl.register);
router.post('/users/login', userCtrl.login)
router.patch('/users/update/:userId', authMiddleware, userCtrl.updateUser);
router.delete('/users/:delete/:userId', authMiddleware, userCtrl.deleteUser);
return router;

}