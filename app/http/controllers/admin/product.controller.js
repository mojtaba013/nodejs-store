const Controller = require("../controller");

class ProductController extends Controller{
async addProduct(req,res,next){
    try {
        const images = ListOfImagesFromRequest(req?.files || [], req.body.fileUploadPath)
        const productBody = await createProductSchema.validateAsync(req.body);
        const { title, text, short_text, category, tags, count, price, discount, type } = productBody;
        const supplier = req.user._id;
        let features = setFeatures(req.body)
        const product = await ProductModel.create({
          title,
          text,
          short_text,
          category,
          tags,
          count,
          price,
          discount,
          images,
          features,
          supplier,
          type
        })
        return res.status(HttpStatus.CREATED).json({
          statusCode: HttpStatus.CREATED,
          data: {
            message: "ثبت محصول با موفقیت انجام شد"
          }
        });
      } catch (error) {
        deleteFileInPublic(req.body.image)
        next(error);
      }
}

async editProduct(req,res,next){
    try {
        
    } catch (error) {
        
    }
}

async removeProduct(req,res,next){
    try {
        
    } catch (error) {
        
    }
}

async getAllProducts(req,res,next){
    try {
        
    } catch (error) {
        
    }
}

async getOneProduct(req,res,next){
    try {
        
    } catch (error) {
        
    }
}
}

module.exports={
    ProductController:new ProductController()
}