const { create } = require("@hapi/joi/lib/ref");
const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const {
  SECRET_KEY,
  ACCESS_TOKEN_SECRET_KEY,
  REFRESH_TOKEN_SECRET_KEY,
} = require("./constans");
const redisClient = require("./init_redis");

const randomNumberGenerator = () => {
  return Math.floor(Math.random() * 90000 + 10000);
};

function SignAccessToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const option = {
      expiresIn: "1d",
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY, option, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطایی رخ داده است"));
      resolve(token);
    });
  });
}

function SignRefreshToken(userId) {
  return new Promise(async (resolve, reject) => {
    const user = await UserModel.findById(userId);
    const payload = {
      mobile: user.mobile,
    };
    const option = {
      expiresIn: "1y",
    };
    JWT.sign(payload, REFRESH_TOKEN_SECRET_KEY, option, async (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطایی رخ داده است"));
      await redisClient.SETEX(String(userId), (365 * 24 * 60 * 60), token);
      resolve(token);
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (arr, payload) => {
      if (err)
        reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"));
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, opt: 0 });
      if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"));
      const refreshToken = await redisClient.get(user._id);
      if(token===refreshToken)return resolve(mobile);
      reject(createHttpError.Unauthorized('ورود به حساب کاربری انجام نشد'))
      
    });
  });
}

module.exports = {
  randomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  verifyRefreshToken
};
