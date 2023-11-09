const { createBlogSchema } = require("../../validators/admin/blog.schema");
const Controller = require("../controller");

class BlogController extends Controller {
  async createBlog(req, res, next) {
    try {
      const blogDataBody=await createBlogSchema.validateAsync(req.body)
      return res.json(blogDataBody)
    } catch (error) {
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
      return  res.status(200).json({
        data: {
          blogs: [],
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
