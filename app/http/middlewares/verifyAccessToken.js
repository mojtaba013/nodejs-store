const JWT = require("jsonwebtoken");
const {
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("../../utils/constans");
const createHttpError = require("http-errors");
const { UserModel } = require("../../models/users");
const redisClient = require("redis");

function verifyAccessToken(req, res, next) {
  const headers = req.headers;
  const [bearer, token] = headers?.["access-token"]?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer))
    JWT.verify(token, ACCESS_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        return next(createHttpError.Unauthorized(" وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user)
        return next(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
      req.user = user;
      return next();
    });
  else return next(createHttpError.Unauthorized(" وارد حساب کاربری خود شوید"));
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
      if (err)
        reject(createHttpError.Unauthorized(" وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });
      if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
      const refreshToken = await redisClient.get(user?._id || "key_default");
      if (!refreshToken)
        reject(
          createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد")
        );
      if (token === refreshToken) return resolve(mobile);
      reject(
        createHttpError.Unauthorized("ورود مجدد به حساب کاربری انجام نشد")
      );
    });
  });
}

module.exports = {
  verifyAccessToken,
  verifyRefreshToken,
};
