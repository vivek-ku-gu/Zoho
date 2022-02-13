const mongoose = require('mongoose')
const validator = require('validator')
const Schema1 =  new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
            validate(value){
                if(!validator.isEmail(value)){
   throw new Error("email is invalid")
                }
            }
        },
        password:{
            type:String,
            required:true, 
         },
         secret:{
            type:String,
            required:true, 
         }
        
        //  date:{type:Date,
        //  default:Date.now}   
     })

     // // mongoose.Collection creation
     const login = mongoose.model("login",Schema1);
     module.exports=login;
  