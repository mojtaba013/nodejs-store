const { CategoryRoutes } = require('./category')

const router=require('express').Router()
/**
 * @swagger
 *  tags:
 *      -  name: Admin-Panel
 *      -  description: action of admin...
 *      -  name: Category(AdminPanel)     
 *         description: all method and routes about category section 
 */
router.use('/category',CategoryRoutes)
module.exports={
    AdminRoutes:router
}