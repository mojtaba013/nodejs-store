const {
  UserAuthController,
} = require("../../http/controllers/user/auth/auth.controller");

const router = require("express").Router();
/**
 * @swagger
 * tags:
 *      name: User-Authentication
 *      description: user-auth section
 */
/**
 * @swagger
 * /user/get-otp:
 *        post:
 *           tags: [User-Authentication]
 *           summary: get-otp user in userpanel with phone number
 *           description: one time password(otp)
 *           parameters:
 *           -  name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *           responses:
 *              201:
 *                  description: success
 *              400:
 *                  description: bad Request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: internal server error
 */

router.post("/get-otp", UserAuthController.getOtp);
/**
 * @swagger
 *  /user/check-otp:
 *      post:
 *          tags : [User-Authentication]
 *          summary: check-otp value in user controller
 *          description: check otp with code-mobile and expires date
 *          parameters:
 *          -   name: mobile
 *              description: fa-IRI phonenumber
 *              in: formData
 *              required: true
 *              type: string
 *          -   name: code
 *              description: enter sms code 
 *              in: formData
 *              required: true
 *              type: string
 *          responses:
 *              201:
 *                  description: Success
 *              400:
 *                  description: Bad Request
 *              401:
 *                  description: Unauthorization
 *              500:
 *                  description: Internal Server Error
 */

router.post("/check-otp", UserAuthController.checkOtp);
module.exports = {
  UserAuthRoutes: router,
};
