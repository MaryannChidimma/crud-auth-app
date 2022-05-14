
const UserRoutes = require('../routes/userRoutes')
const ProductRoutes = require('../routes/product')
module.exports = (router) => {

    router.use('/v1', UserRoutes())
    router.use('/v1', ProductRoutes())


    return router;
}




