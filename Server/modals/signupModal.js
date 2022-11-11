const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId

const signUpTemplate =  new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    dateOfBirth:{
        type:String
    },
    verified:{
        type:Boolean,
        default:false
    },
    password:{
        type:String,
        required:true
    },
    post:[{
        type:ObjectId,
        ref:'Posts'
    }],   
},{ timestamps: true })

const User=mongoose.model('users',signUpTemplate)
module.exports={User};