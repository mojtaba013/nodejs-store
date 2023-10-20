const createHttpError = require("http-errors");
const { authSchema } = require("../../../validators/user/auth.schema");
const { randomNumberGenerator } = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/users");
const { EXPIRES_IN, USER_ROLE } = require("../../../../utils/constans");
const Controller = require("../../controller");

class UserAuthController extends Controller {
  async login(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
      const code = randomNumberGenerator();
      const { mobile } = req.body;
      const result = this.saveUser(mobile, code);
      if (!result) throw createHttpError.Unauthorized("ورود انجام نشد");
      return res
        .status(200)
        .send({
          data: {
            statusCode: 200,
            message: "کد اعتبارسنجی ارسال شد",
            code,
            mobile,
          },
        });
    } catch (error) {
      next(createHttpError.BadRequest(error.message));
    }
  }

  async saveUser(mobile,code) {
    let otp = {
      code,
      expiresIn: EXPIRES_IN,
    };
    const result = await this.checkExistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({ mobile, otp, roles: [USER_ROLE] }));
  }

  async checkExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async updateUser(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", 0, null, undefined, "0", NaN].includes(objectData[key]))
        delete objectData[key];
    });
    const updateResult = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );
    return !!updateResult.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
