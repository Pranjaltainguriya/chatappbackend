const mongoose = require("mongoose");
const { applyTimestamps } = require("./usermodel");
 const msssageSchema=mongoose.Schema({

    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    
   receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    message:{
        type:String,
        required:true,
        
    },
 },{timestamps:true})
 module.exports=mongoose.model("Massage",msssageSchema)