const { Mongoose, default: mongoose } = require("mongoose");

const Schema=new Mongoose.Schema({
title:{type:String,required:true},
short_desc:{type:String,required:true},
total_desc:{type:String,required:true},
images:{type:[String],required:true},
tags:{type:[String],default:[]},
category:{type:mongoose.Types.ObjectId,required:true},
comments:{type:[],default:[]},
like:{type:[mongoose.Types.ObjectId],default:[]},
dislike:{type:[mongoose.Types.ObjectId],default:[]},
bookmark:{type:[mongoose.Types.ObjectId],default:[]},
price:{type:Number,default:0},
discount:{type:Number,default:0},
count:{type:Number},
type:{type:String,required:true},
time:{type:String},
format:{type:String},
teacher:{type:String,required:true},
feture:{type:Object,default:{
    length:"",
    height:"",
    width:"",
    weight:"",
    color:[],
    model:[],
    madein:""
}},

})

module.exports={
    ProductModel:Mongoose.model("product",Schema)
}