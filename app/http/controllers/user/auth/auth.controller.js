const createHttpError = require("http-errors");
const {
  getOtpSchema,
  checkOtpSchema,
} = require("../../../validators/user/auth.schema");
const {
  randomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
} = require("../../../../utils/functions");
const { UserModel } = require("../../../../models/users");
const { ROLES } = require("../../../../utils/constans");
const Controller = require("../../controller");
const { verify } = require("jsonwebtoken");

const { date } = require("@hapi/joi");

class UserAuthController extends Controller {
  async getOtp(req, res, next) {
    try {
      await getOtpSchema.validateAsync(req.body);
      const code = randomNumberGenerator();
      const { mobile } = req.body;
      const result = this.saveUser(mobile, code);
      if (!result) throw createHttpError.Unauthorized("ورود انجام نشد");
      return res.status(200).send({
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

  async checkOtp(req, res, next) {
    try {
      console.log(req.body);
      await checkOtpSchema.validateAsync(req.body);
      const { mobile, code } = req.body;
      const user = await UserModel.findOne({ mobile });
      if (!user) throw createHttpError.NotFound("کاربر یافت نشد");
      if (user.otp.code != code)
        throw createHttpError.Unauthorized("کد ارسال شده صحیح نمی باشد");
      //علامت + برای تبدیل به عدد
      const now = new Date().getTime();
      if (+user.otp.expiresIn < now)
        throw createHttpError.Unauthorized("کد ارسالی منقضی شده است");
      const accessToken = await SignAccessToken(user._id);
      const refreshToken = await SignRefreshToken(user._id);

      return res.json({
        data: {
          accessToken,
          refreshToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      const mobile = await verifyRefreshToken(refreshToken);
      const user = await UserModel.findOne({ mobile });
      const accessToken = await SignAccessToken(user._id);
      const newRefreshToken = await SignRefreshToken(user._id);
      return res.status(200).json({
        StatusCode: 200,
        data: {
          accessToken,
          refreshToken: newRefreshToken,
          user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async saveUser(mobile, code) {
    let otp = {
      code,
      expiresIn: new Date().getTime() + 120000,
    };
    const result = await this.checkExistUser(mobile);
    if (result) {
      return await this.updateUser(mobile, { otp });
    }
    return !!(await UserModel.create({ mobile, otp, roles: [ROLES.USER] }));
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
