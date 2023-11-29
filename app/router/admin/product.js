const router = require("express").Router();
const { ProductController } = require("../../http/controllers/admin/product.controller");
const { uploadFiles } = require("../../utils/multer");

router.post('/add',uploadFiles.single('image'),ProductController.addProduct);
// router.patch();
// router.delete();
// router.get();
// router.get();
module.exports = {
  AdminApiProductRouter: router,
};
