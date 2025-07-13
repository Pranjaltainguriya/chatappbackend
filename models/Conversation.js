const mongoose = require("mongoose");
const { applyTimestamps } = require("./usermodel");

const conversationSchema=mongoose.Schema({

   particepents:[

        {
            type:mongoose.Schema.Types.ObjectId,
              ref:"User",
            required:true
        },
        
    ],
       messages:[
         {
            type:mongoose.Schema.Types.ObjectId,
              ref:"Massage",
            required:true
        },
       ]
},{timestamps:true})
 module.exports=mongoose.model("Conversation",conversationSchema)