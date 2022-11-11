const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId


const Otp =  new mongoose.Schema({
userId:String,
otp:String,
expireAt:Date
},{ timestamps: true })

const verifyOtp=mongoose.model('VerificationOtp',Otp)
module.exports={verifyOtp};