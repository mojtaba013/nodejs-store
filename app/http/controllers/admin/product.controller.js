const Controller = require("../controller");

class ProductController extends Controller{
async addProduct(req,res,next){
    try {
        return res.json(req.body)
    } catch (error) {
        
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