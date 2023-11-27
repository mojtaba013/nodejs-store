const autoBind = require("auto-bind");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const morgan = require("morgan");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const createError = require("http-errors");
const cors = require("cors");
const { AllRoutes } = require("./router/router");
module.exports = class Application {
  #app = express();
  #DB_URI;
  #PORT;
  constructor(PORT, DB_URI) {
    autoBind(this);
    this.#PORT = PORT;
    this.#DB_URI = DB_URI;
    this.configApplication();
    this.initRedis();
    this.connectToMongoDB();
    this.createServer(this.#PORT);
    this.createRoutes();
    this.errorHandling();
  }

  configApplication() {
    //this.#app.use(morgan("dev"));
    this.#app.use(cors());
    this.#app.use(express.json());
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));
    this.#app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            openapi: "3.0.0",
            info: {
              title: "boto start",
              version: "2.0.0",
              description: "website programming",
            },
            servers: [{ url: "http://localhost:5000" }],
            components: {
              securitySchemes: {
                BearerAuth: {
                  type: "http",
                  scheme: "bearer",
                  bearerFormat: "JWT",
                },
              },
            },

            security: [{ BearerAuth: [] }],
          },
          apis: ["./app/router/**/*.js"],
        }),
        { explorer: true }
      )
    );
  }

  createServer() {
    const http = require("http");
    http.createServer(this.#app).listen(this.#PORT, () => {
      console.log(`server is run on http://localhost:${this.#PORT}`);
    });
  }

  connectToMongoDB() {
    mongoose
      .connect(this.#DB_URI)
      .then(() => console.log("connect to database successfull"));
    mongoose.connection.on("connected", () => {
      console.log("mongoose connected to DB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("mongoose connection is disconnected");
    });
  }

  initRedis() {
    require("./utils/init_redis");
  }

  createRoutes() {
    this.#app.use(AllRoutes);
  }

  errorHandling() {
    this.#app.use((req, res, next) => {
      // return res.status(404).json({
      //   statuscode: 404,
      //   message: "صفحه مورد نظر پیدا نشد",
      // });
      next(createError.NotFound("صفحه مورد نظر پیدا نشد"));
    });
    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
      const statuscode = error.statuscode || serverError.status;
      const message = error.message || serverError.message;
      return res.status(statuscode).json({
        error: {
          statuscode,
          message,
        },
      });
    });
  }
};
