const { verifyAccessToken, checkRole } = require("../http/middlewares/verifyAccessToken");
const redisClient = require("../utils/init_redis");
const { AdminRoutes } = require("./admin/admin.routes");
const { HomeRoutes } = require("./api");
const { DeveloperRoutes } = require("./developer.routes");

const { UserAuthRoutes } = require("./user/auth");

// (async()=>{
//     await redisClient.set('key','value')
//     const value=await redisClient.get('key')
//     console.log(value);
// })()

const router = require("express").Router();
router.use("/user", UserAuthRoutes);
router.use("/developer", DeveloperRoutes);
router.use("/admin",verifyAccessToken,checkRole('ADMIN'), AdminRoutes);
router.use("/", HomeRoutes);

module.exports = {
  AllRoutes: router,
};
