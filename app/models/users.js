const { Mongoose } = require("mongoose");

const Schema = new Mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String ,lowercase:true},
  phone: { type: String },
  email: { type: String ,lowercase:true},
  password: { type: String },
  otp: { type: String ,default:{code:"",expires:new Date().getDate()+120}},
  bills:{type:[],default:[]},
  discount:{type:Number,default:0},
  birthday:{type:String},
  roles:{type:[String],default:"USER"}
});

module.exports = {
  UserModel: Mongoose.model("user", Schema),
};
