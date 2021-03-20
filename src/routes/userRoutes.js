const userCtrl = require('../controllers/userController');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware')
//require('express-async-errors')

module.exports = function () {
router.post('/users/register', userCtrl.register);
router.post('/users/login', userCtrl.login)
router.patch('/users/:userId', authMiddleware, userCtrl.update);
router.delete('/users/:userId', authMiddleware, userCtrl.delete);
return router;

}