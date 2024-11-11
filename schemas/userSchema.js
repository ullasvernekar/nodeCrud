import mongoose from "mongoose";
import express from "express";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({  //create table with below feilds, mongoose.schema being the synatx
    username : String,
    phone : {type :Number,required : true},
    email : String,
    password : String,
    dateCreated : {type : Date,default: Date.now},
    dateModified : {type : Date,default : Date.now} 
});  //why ;

//why this is required 
userSchema.pre("save",async function(next){
  if(!this.isModified("password")){
    next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
    next();
  });

  userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

//why??
const User = mongoose.model("user",userSchema);
export default User; //reverse autowire

