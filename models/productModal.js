const mongoose = require('mongoose');
 
 const productSchema= new mongoose.Schema({
name:{type:String,
      required:true},

imageurl:{type:String,
       required:true},

brand:{type:String,
       required:true},
price:{type:Number, required:true,default:0
       },
description :{type:String, required:true},
category:{type:String,
         required:true},
 
countInStock:{type:Number,
	  default:0,
     required:true},

rating:{type:Number,
	     default:0,
       required:true},

numReviews:{type:Number,
	      default:0,
         required:true}

 });

 const productModal= mongoose.model('Product',productSchema);
 module.exports= productModal;
