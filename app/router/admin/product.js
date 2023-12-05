const router = require("express").Router();
const { ProductController } = require("../../http/controllers/admin/product.controller");
const { stringToArray } = require("../../http/middlewares/stringToArray");
const { uploadFiles } = require("../../utils/multer");

router.post('/add',uploadFiles.array('images',10),stringToArray('tags', "colors"),ProductController.addProduct);
// router.patch();
// router.delete();
// router.get();
// router.get();
module.exports = {
  AdminApiProductRouter: router,
};
