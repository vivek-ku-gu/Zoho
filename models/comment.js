const mongoose = require('mongoose')
const Schema =  new mongoose.Schema(
    {
      username:{type:String,
       required:true},
       comment:{type:String,
         required:true}  
        
        //  date:{type:Date,
        //  default:Date.now}   
     })

     // // mongoose.Collection creation
     const comments = mongoose.model("comments",Schema);
     module.exports=comments;
  