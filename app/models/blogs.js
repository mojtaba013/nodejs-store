const { Mongoose, default: mongoose } = require("mongoose");

const Schema = new Mongoose.Schema({
  author: { type: mongoose.Types.ObjectId, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true },
  image: { type: String, required: true },
  tags: { type: [String], default: [] },
  category: { type: mongoose.Types.ObjectId, required: true },
  comments: { type: [], default: [] },
  like: { type: [mongoose.Types.ObjectId], default: [] },
  dislike: { type: [mongoose.Types.ObjectId], default: [] },
  bookmark: { type: [mongoose.Types.ObjectId], default: [] },
});

module.exports = {
  BlogModel: Mongoose.model("blog", Schema),
};
