
 const UserRoutes = require('../routes/userRoutes')
module.exports = (router) => {
   
    router.use('/v1', UserRoutes())
    

    return router;
}




