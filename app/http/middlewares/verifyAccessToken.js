const JWT = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("../../utils/constans");
const createHttpError = require("http-errors");
const { UserModel } = require("../../models/users");
const redisClient = require("redis");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createHttpError.Unauthorized(
    "حساب کاربری شناسایی نشد وارد حساب کاربری خود شوید"
  );
}

function verifyAccessToken(req, res, next) {
  try {
    const token = getToken(req.headers);
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      try {
        if (err)
          throw createHttpError.Unauthorized("وارد حساب کاربری خود شوید");
        const { mobile } = payload || {};
        const user = await UserModel.findOne(
          { mobile },
          { password: 0, otp: 0 }
        );
        if (!user) throw createHttpError.Unauthorized("حساب کاربری یافت نشد");
        req.user = user;
        return next();
      } catch (error) {
        next(error);
      }
    });
  } catch (error) {
    next(error);
  }
}

function checkRole(role) {
  return function (req, res, next) {
    try {
      const user = req.user;
      console.log(user);
      if (user.roles.includes(role)) return next();
      throw createHttpError.Forbidden(
        "You do not have permission to access this area"
      );
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  verifyAccessToken,
  checkRole,
};
