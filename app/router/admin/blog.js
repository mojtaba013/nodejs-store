const router = require("express").Router();
const {
  AdminBlogController,
} = require("../../http/controllers/admin/blog.controller");
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
module.exports = {
  BlogAdminApiRoutes: router,
};
