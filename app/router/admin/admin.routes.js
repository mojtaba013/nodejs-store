const {
  verifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");
const { AdminApiBlogRouter } = require("./blog");
const { AdminApiCategoryRouter } = require("./category");
const { AdminApiProductRouter } = require("./product");

const router = require("express").Router();
/**
 * @swagger
 *  tags:
 *      -  name: Admin-Panel
 *      -  description: action of admin...
 *      -  name: Product(AdminPanel)
 *      -  description: management products routes
 *      -  name: Category(AdminPanel)
 *         description: all method and routes about category section
 *      -  name: Blog(AdminPanel)
 *         description: make blog management  admin panel
 */
router.use("/category", AdminApiCategoryRouter);
router.use("/blogs", AdminApiBlogRouter);
router.use("/products", AdminApiProductRouter);
module.exports = {
  AdminRoutes: router,
};
