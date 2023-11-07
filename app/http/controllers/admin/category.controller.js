const createHttpError = require("http-errors");
const { CategoryModel } = require("../../../models/categories");
const Controller = require("../controller");
const { addCategorySchema } = require("../../validators/admin/category.schema");
const  mongoose  = require("mongoose");

class CategoryController extends Controller {
  async addCategory(req, res, next) {
    try {
      await addCategorySchema.validateAsync(req.body);
      const { title, parent } = req.body;
      const category = await CategoryModel.create({ title, parent });
      if (!category) throw createHttpError.InternalServerError("خطای داخلی");
      return res.status(201).json({
        data: {
          statuscode: 201,
          message: "دسته بندی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;
      const category = await this.checkExistCategory(id);
      const deleteresult = await CategoryModel.deleteMany({
        $or: [{ _id: category._id }, { parent: category._id }],
      });
      if (deleteresult.deletedCount == 0)
        throw createHttpError.InternalServerError(
          "حذف دسته بندی با مشکل روبرو شده است"
        );
      return res.status(200).json({
        data: {
          message: "حذف دسته بندی با موفقیت انجام شد",
        },
      });
    } catch (error) {
      next(error);
    }
  }

  editCategory(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      const category = await CategoryModel.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
        {
          $match: {
            parent: undefined,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req, res, next) {
    try {
      const { id:_id } = req.params;
      const category = await CategoryModel.aggregate([
        {
          $match: {
            _id:new mongoose.Types.ObjectId(_id),
          },
        },
        {
          $lookup: {
            from: "categories",
            localField: "_id",
            foreignField: "parent",
            as: "children",
          },
        },
        {
          $project: {
            __v: 0,
            "children.__v": 0,
            "children.parent": 0,
          },
        },
      ]);
      return res.status(200).json({
        data: {
          category,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllParents(req, res, next) {
    try {
      const parents = await CategoryModel.find({ parent: undefined });
      return res.status(200).json({
        data: {
          parents,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getChildOfParents(req, res, next) {
    try {
      const { parent } = req.params;
      const children = await CategoryModel.find({ parent });
      return res.status(200).json({
        data: {
          children,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async checkExistCategory(id) {
    const category = await CategoryModel.findById(id);
    if (!category) throw createHttpError.NotFound("دسته بندی پیدا نشد");
    return category;
  }
}

module.exports = {
  CategoryController: new CategoryController(),
};
