const Joi = require("@hapi/joi");
const {  MongoIDPattern } = require("../../../utils/constans");
const createHttpError = require("http-errors");
const addCategorySchema = Joi.object({
  title : Joi.string().min(3).max(30).error(createHttpError.BadRequest("عنوان دسته بندی صحیح نمیباشد")),
  parent: Joi.string().allow('').pattern(MongoIDPattern).allow("").error(createHttpError.BadRequest("شناسه ارسال شده صحیح نمیباشد"))
});

module.exports = {
  addCategorySchema,
 
};
