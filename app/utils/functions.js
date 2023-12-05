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
const fs = require("fs");
const path = require("path");

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
      expiresIn: "1y",
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
      await redisClient.SETEX(String(userId), 365 * 24 * 60 * 60, token);
      resolve(token);
    });
  });
}

function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
      JWT.verify(token, REFRESH_TOKEN_SECRET_KEY, async (err, payload) => {
          if (err) reject(createHttpError.Unauthorized("وارد حساب کاربری خود شوید"))
          const { mobile } = payload || {};
          const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 })
          if (!user) reject(createHttpError.Unauthorized("حساب کاربری یافت نشد"))
          const refreshToken = await redisClient.get(String(user?._id));
          if (!refreshToken) reject(createHttpError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"))
          if (token === refreshToken) return resolve(mobile);
          reject(createHttpError.Unauthorized("ورود مجدد به حسابی کاربری انجام نشد"))
      })
  })
}

function deleteFileInPublic(fileAddress) {
  if (fileAddress) {
    const pathFile = path.join(__dirname, "..", "..", "public", fileAddress);
    if (fs.existsSync(pathFile)) fs.unlinkSync(pathFile);
  }
}

function ListOfImagesFromRequest(files, fileUploadPath) {
  if (files?.length > 0) {
    return files
      .map((file) => path.join(fileUploadPath, file.filename))
      .map((item) => item.replace(/\\/g, "/"));
  } else {
    return [];
  }
}

function setFeatures(body) {
  const { colors, width, weight, height, length } = body;
  let features = {};
  features.colors = colors;
  if (!isNaN(+width) || !isNaN(+height) || !isNaN(+weight) || !isNaN(+length)) {
    if (!width) features.width = 0;
    else features.width = +width;
    if (!height) features.height = 0;
    else features.height = +height;
    if (!weight) features.weight = 0;
    else features.weight = +weight;
    if (!length) features.length = 0;
    else features.length = +length;
  }
  return features;
}

module.exports = {
  randomNumberGenerator,
  SignAccessToken,
  SignRefreshToken,
  verifyRefreshToken,
  deleteFileInPublic,
  ListOfImagesFromRequest,
  setFeatures
};
