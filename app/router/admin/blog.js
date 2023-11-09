const router = require("express").Router();
const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
const { stringToArray } = require("../../http/middlewares/stringtoarray");
const { uploadFiles } = require("../../utils/multer");
/**
 *  @swagger
 *      /admin/blogs:
 *          get:
 *              tags: [Blog(AdminPanel)]
 *              summary: get all blogs
 *              responses:
 *                  200:
 *                      description: succcee-get array of blogs
 */
router.get("/", AdminBlogController.getListOfBlog);
/**
 *  @swagger
 *      /admin/blogs/add:
 *          post:
 *              tags: [Blog(AdminPanel)]
 *              summary: create blogs
 *              consumes: 
 *                  - multipart/form-data
 *              parameters:
 *                  -   in: formData
 *                      name: title
 *                      required: true
 *                      type: string
 *                  -   in: formData
 *                      name: text
 *                      required: true
 *                      type: string
 *                  -   in: formData
 *                      name: short_text
 *                      required: true
 *                      type: string
 *                  -   in: formData
 *                      name: tags
 *                      example: tag1#tag2#tag3
 *                      type: string
 *                  -   in: formData
 *                      name: category
 *                      required: true
 *                      type: string
 *                  -   in: formData
 *                      name: image
 *                      required: true
 *                      type: file
 *              responses:
 *                  200:
 *                      description: succcee-get array of blogs
 */
router.post("/add",uploadFiles.single('image'),stringToArray('tags'), AdminBlogController.createBlog);
module.exports = {
  BlogAdminApiRoutes: router,
};
