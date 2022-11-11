const { response } = require("express");
const nodemailer = require("nodemailer")
const {verifyOtp} = require('../modals/otpModal')
const {User} = require('../modals/signupModal')
const bcrypt = require('bcrypt')



async function mailer(otp,email,userIdentification,subject="OTP verification") {
console.log("hello");


  let transporter = nodemailer.createTransport({
    service:"gmail",
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });


   await transporter.sendMail({
    from: 'gamegramsocial@gmail.com', 
    to: email,
    subject: subject, 
    text: "otp verification", 
    html: "<b>"+otp+"</b>",
  }).then(async (response)=>{
    console.log();
    otp=otp.toString()
        let hashOTP = await bcrypt.hash(otp,10)
        User.findOne({email:email}).then(async(response)=>{
          let verify = await verifyOtp.findOne({userId:response._id})
          if(!verify){
          const userverification = new verifyOtp({
              userId: userIdentification,
              otp: hashOTP,
              createdAt: Date.now(),
              expiresAt: Date.now() + 10000
          })
          await userverification.save()
      }else{
          await verifyOtp.updateOne({userId:response._id},{otp:hashOTP})
      }
        }).catch((err)=>{
          res.status(401).json({message:"user nor permited"})
        })
    console.log("Message sent: %s", response.messageId);
  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(response));
    return(response)
  }); 


}


module.exports = {mailer}