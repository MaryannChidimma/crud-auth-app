const userCtrl = require('../controllers/userController');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware')

module.exports = function () {
router.post('/users/register', userCtrl.register);
router.post('/users/login', userCtrl.login)
router.patch('/users/update', authMiddleware.authenticateUser, userCtrl.updateUser);
router.delete('/users/delete', authMiddleware.authenticateUser, userCtrl.deleteUser);
return router;

}