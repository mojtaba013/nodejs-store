const { CategoryController } = require('../../http/controllers/admin/category.controller')

const router=require('express').Router()


/**
 * @swagger
 *  /admin/category/add:
 *      post:
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
 *          tags: [Category(AdminPanel)]
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
/**
 * @swagger
 *  /admin/category/list-of-all:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get all categoreis without populate
         
 *          responses:
 *               200:
 *                  description: success
 */
router.get('/list-of-all',CategoryController.getAllCategoryWithoutPopulate)
/**
 * @swagger
 *  /admin/category/{id}:
 *      get:
 *          tags: [Category(AdminPanel)]
 *          summary: get category by Id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true        
 *          responses:
 *               200:
 *                  description: success
 */
router.get('/:id',CategoryController.getCategoryById)
/**
 * @swagger
 *  /admin/category/update/{id}:
 *      patch:
 *          tags: [Category(AdminPanel)]
 *          summary: edit or update category title with object id
 *          parameters:
 *              -   in: path
 *                  name: id
 *                  type: string
 *                  required: true 
 *              -   in: formData
 *                  name: title
 *                  type: string
 *                  required: true           
 *          responses:
 *               200:
 *                  description: success
 *               500:
 *                  description: internal server error
 */
router.patch('/update/:id',CategoryController.editCategoryTitle)

module.exports={
    CategoryRoutes:router
}