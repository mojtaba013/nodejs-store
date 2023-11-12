const { verifyAccessToken } = require('../../http/middlewares/verifyAccessToken')
const { BlogAdminApiRoutes } = require('./blog')
const { CategoryRoutes } = require('./category')

const router=require('express').Router()
/**
 * @swagger
 *  tags:
 *      -  name: Admin-Panel
 *      -  description: action of admin...
 *      -  name: Category(AdminPanel)     
 *         description: all method and routes about category section 
 *      -  name: Blog(AdminPanel)     
 *         description: make blog management  admin panel
 */
router.use('/category',CategoryRoutes)
router.use('/blogs',verifyAccessToken, BlogAdminApiRoutes)
module.exports={
    AdminRoutes:router
}