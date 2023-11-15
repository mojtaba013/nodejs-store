const createHttpError = require("http-errors");
const { BlogModel } = require("../../../models/blogs");
const { deleteFileInPublic } = require("../../../utils/functions");
const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");
const path = require("path");
class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody = await createBlogSchema.validateAsync(req.body);
      req.body.image = path.join(
        blogDataBody.fileUploadPath,
        blogDataBody.filename
      );
      req.body.image = req.body.image.replace(/\\/g, "/");
      const { title, text, short_text, tags, category } = blogDataBody;
      const image = req.body.image;
      const author = req.user._id;
      const blog = await BlogModel.create({
        title,
        image,
        text,
        short_text,
        tags,
        category,
        author,
      });
      console.log(blogDataBody);
      return res.status(201).json({
        data: {
          statuscode: 201,
          message: "بلاگ جدید با موفقیت ثبت شد",
        },
      });
    } catch (error) {
      deleteFileInPublic(req.body.image);
      next(error);
    }
  }

  async getOneBlogById(req, res, next) {
    try {
      const { id } = req.params;
      const blog = await this.findBlog(id);
      return res.status(200).json({
        data: {
          statusCode: 200,
          blog,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getListOfBlog(req, res, next) {
    try {
      // const blogs=await BlogModel.aggregate([
      //   {$match:{}},
      //   {
      //     $lookup:{
      //       from:'user',
      //       foreignField:'_id',
      //       localField:'author',
      //       as:'author'
      //     }
      //   },
      //   {
      //     $unwind:'$author'
      //   },
      //   {
      //     $lookup:{
      //       from:'categories',
      //       foreignField:'_id',
      //       localField:'category',
      //       as:'category'
      //     }
      //   },
      //   {
      //     $unwind:'$author'
      //   },
      //   {
      //     $project:{
      //       'author.__v':0,
      //       'category.__v':0,
      //       'author.otp':0,
      //       'author.Roles':0,
      //       'author.discount':0,
      //       'author.bills':0,
      //     }
      //   }
      // ])
      const blogs = await BlogModel.find({});
      return res.status(200).json({
        data: {
          blogs,
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
      const {id}=req.params
      await this.findBlog(id)
      const result=await BlogModel.deleteOne({_id:id})
      if(result.deleteCount==0) throw createHttpError.InternalServerError('delete blog failed.')
      return res.status(200).json({
    data:{
      statusCode:200,
      message:'blog deleted.'
    }})
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

  async findBlog(id) {
    const blog = await BlogModel.findById(id).populate([
      { path: "category", select: ["title"] },
      {
        path: "author",
        select: ["mobile", "first_name", "last_name", "username"],
      },
    ]);
    if (!blog) throw createError.NotFound("مقاله ای یافت نشد");
    delete blog.category.children;
    return blog;
  }
}
module.exports = {
  AdminBlogController: new BlogController(),
};
