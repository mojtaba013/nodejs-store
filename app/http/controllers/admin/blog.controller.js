const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path=require('path')
class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody=await createBlogSchema.validateAsync(req.body)
      req.body.image=path.join(blogDataBody.fileUploadPath,blogDataBody.filename)
      req.body.image=req.body.image.replace(/\\/g,'/')
      const {title,text,short_text,tags,categoy}=blogDataBody
      const image=req.body.image
      const author=req.user._id
      const blog=await BlogModel.create({title,image,text,short_text,tags,categoy,author})
      return res.status(201).json({
        data:{
          statuscode:201,
          message:'بلاگ جدید با موفقیت ثبت شد'
        }
      })
    } catch (error) {
      deleteFileInPublic(req.body.image)
      next(error);
    }
  }

  async getOneBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getListOfBlog(req, res, next) {
    try {
      const blogs=await BlogModel.aggregate([
        {$match:{}},
        {
          $lookup:{
            from:'user',
            foreignField:'_id',
            localField:'author',
            as:'author'
          }
        },
        {
          $unwind:'$author'
        },
        {
          $lookup:{
            from:'categories',
            foreignField:'_id',
            localField:'category',
            as:'category'
          }
        },
        {
          $unwind:'$author'
        },
        {
          $project:{
            'author.__v':0,
            'category.__v':0,
            'author.otp':0,
            'author.Roles':0,
            'author.discount':0,
            'author.bills':0,
          }
        }
      ])
      return  res.status(200).json({
        data: {
          blogs
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCommentsOfBlog(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async updateBlogById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = {
  AdminBlogController: new BlogController(),
};
