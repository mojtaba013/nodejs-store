const { CategoryController } = require('../../http/controllers/admin/category.controller')

const router=require('express').Router()


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Admin-Panel]
 *          summary: create new category title
 *          parameters:
 *              -     in: formData
 *                    type: string
 *                    required: true
 *                    name: title 
 *              -     in: formData
 *                    type: string
 *                    
 *                    name: parent
 *          responses:
 *              201:
 *                  description: success 
 */

router.post('/add',CategoryController.addCategory)
/**
 * @swagger
 *  /admin/category/parents:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all parents of category
 *          responses:
 *               200:
 *                  description: success
 */
router.get('/parents',CategoryController.getAllParents)
/**
 * @swagger
 *  /admin/category/children/{parent}:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all children of parents
 *          parameters:
 *              -   in: path
 *                  name: parent
 *                  type: string
 *                  required: true
 *           
 *          responses:
 *               200:
 *                  description: success
 */
router.get('/children/:parent',CategoryController.getChildOfParents)
/**
 * @swagger
 *  /admin/category/all:
 *      get:
 *          tags: [Admin-Panel]
 *          summary: get all categoreis
 *          responses:
 *               200:
 *                  description: success
 */
router.get('/all',CategoryController.getAllCategory)
/**
 * @swagger
 *  /admin/category/remove/{id}:
 *      delete:
 *          tags: [Admin-Panel]
 *          summary: remove categoreis witj objectId
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true        
 *          responses:
 *               200:
 *                  description: success
 */
router.delete('/remove/:id',CategoryController.removeCategory)
module.exports={
    CategoryRoutes:router
}