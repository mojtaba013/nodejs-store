const { CategoryRoutes } = require('./category')

const router=require('express').Router()
/**
 * @swagger
 *  tags:
 *  name: Admin-Panel
 *  description: action of admin...
 */
router.use('/category',CategoryRoutes)
module.exports={
    AdminRoutes:router
}