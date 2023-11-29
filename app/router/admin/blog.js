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
 *              parameters:
 *                  -   in: header
 *                      example: Bearer token
 *                      value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2JpbGUiOiIwOTM5ODUxNjM0MyIsImlhdCI6MTcwMDA2MzAyNSwiZXhwIjoxNzMxNjIwNjI1fQ.9K6p7PcTy9AHDhdMSVbfoxYx5ZphCz-GdG5i0aL4Sck
 *                      name: access-token
 *                      type: string
 *                      required: true
 *              responses:
 *                  200:
 *                      description: succcee-get array of blogs
 */
router.get("/", AdminBlogController.getListOfBlog);
/**
 * @swagger
 *  components:
 *      schemas:
 *          GetOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *          CheckOTP:
 *              type: object
 *              required:
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: the user mobile for signup/signin
 *                  code:
 *                      type: integer
 *                      description: reviced code from getOTP
 *          RefreshToken:
 *              type: object
 *              required:
 *                  -   refreshToken
 *              properties:
 *                  refreshToken:
 *                      type: string
 *                      description: enter refresh-token for get fresh token and refresh-token
 */

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
/**
 *  @swagger
 *      /admin/blogs/update/{id}:
 *          patch:
 *              tags: [Blog(AdminPanel)]
 *              summary: update blogs by id
 *              consumes: 
 *                  - multipart/form-data
 *              parameters:
 *                  -   in: path
 *                      name: id
 *                      type: string
 *                      required: true
 *                  -   in: formData
 *                      name: title
 *                      type: string
 *                  -   in: formData
 *                      name: text
 *                      type: string
 *                  -   in: formData
 *                      name: short_text
 *                      type: string
 *                  -   in: formData
 *                      name: tags
 *                      example: tag1#tag2#tag3
 *                      type: string
 *                  -   in: formData
 *                      name: category
 *                      type: string
 *                  -   in: formData
 *                      name: image
 *                      type: file
 *              responses:
 *                  200:
 *                      description: succcee-get array of blogs
 */
router.patch("/update/:id",uploadFiles.single('image'),stringToArray('tags'), AdminBlogController.updateBlogById);
/**
 * @swagger
 *  /admin/blogs/{id}:
 *        get:
 *            summary: get by id and populate field
 *            tags: [Blog(AdminPanel)]
 *            parameters:
 *                -   in: path
 *                    name: id
 *                    type: string
 *                    required: true
 *            responses:
 *                200:
 *                    description: success 
 */
router.get('/:id',AdminBlogController.getOneBlogById)
/**
 * @swagger
 *  /admin/blogs/{id}:
 *        delete:
 *            summary: delete by id and populate field
 *            tags: [Blog(AdminPanel)]
 *            parameters:
 *                -   in: path
 *                    name: id
 *                    type: string
 *                    required: true
 *            responses:
 *                200:
 *                    description: success 
 */
router.delete('/:id',AdminBlogController.deleteBlogById)

module.exports = {
  AdminApiBlogRouter: router,
};
