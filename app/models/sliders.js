const { Mongoose } = require("mongoose");

const Schema = new Mongoose.Schema({
  title: { type: String },
  text: { type: String },
  image: { type: String, required: true },
  type: { type: String, default:'main' },
});

module.exports = {
  SliderModel: Mongoose.model("slider", Schema),
};
