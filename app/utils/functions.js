const { create } = require("@hapi/joi/lib/ref");
const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../models/users");
const { SECRET_KEY, ACCESS_TOKEN_SECRET_KEY } = require("./constans");

const randomNumberGenerator = () => {
  return Math.floor(Math.random() * 90000 + 10000);
};

function SignAccessToken(userId) {
  return new Promise(async(resolve, reject) => {
    const user=await UserModel.findById(userId)
    const payload = {
      mobile:user.mobile
    };    
    const option = {
      expiresIn:"1d"
    };
    JWT.sign(payload, ACCESS_TOKEN_SECRET_KEY,option, (err, token) => {
      if (err) reject(createHttpError.InternalServerError("خطایی رخ داده است"));
      resolve(token);
    });
  });
}



module.exports = {
  randomNumberGenerator,
  SignAccessToken
};
