const router = require("express").Router();
const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFiles } = require("../../utils/multer");

router.post('/add',uploadFiles.array('images',10),stringToArray('tags', "colors"),ProductController.addProduct);
router.get("/list",ProductController.getAllProducts)
router.get("/:id", ProductController.getOneProduct)
router.delete("/remove/:id", ProductController.removeProductById)
router.patch("/edit/:id", uploadFiles.array("images", 10), stringToArray("tags", "colors"),ProductController.editProduct)
module.exports = {
  AdminApiProductRouter: router,
};
