const redisDB = require('redis');
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect", () => console.log("connect to the redis"));
redisClient.on("ready", () => console.log("connected to redis an ready..."));
redisClient.on("error", (err) => console.log("error", err));
redisClient.on("end", () => console.log("disconnect"));

module.exports = redisClient;
