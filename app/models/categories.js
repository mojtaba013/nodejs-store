const { Mongoose } = require("mongoose");

const Schema = new Mongoose.Schema({
  title: { type: String, required: true },
});

module.exports = {
  CategoryModel: Mongoose.model("category", Schema),
};
