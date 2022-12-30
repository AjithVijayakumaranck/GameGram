const router = require("express").Router()
const bcrypt = require("bcrypt")
const { log } = require("console")
const mongoose = require('mongoose')
const { mailer } = require("../mailer/mailer")
const jwt  = require("jsonwebtoken")
const ObjectId = mongoose.Types.ObjectId
const fs = require('fs');
const { User } = require("../modals/signupModal")
const { verifyOtp } = require("../modals/otpModal")
const Notification = require("../modals/noficationModel")

module.exports = {
    // getNotifications:(req,res,next)=>{
    //   let {userId} = req.params
    //   console.log(userId,"userId");
    //   Notification.findOne({userId:userId}).populate(
    
    //  ).then((response)=>{
    //   console.log(response,"log response");
    //   })
    // },
    getNotifications:(req,res,next)=>{
      let {userId} = req.params
      console.log(userId,"userId");
      Notification.aggregate([
        {
            $match:{userId:ObjectId(userId)}
        },
        {
            $unwind:"$notification"
        },
        {
            $lookup: {
                from: 'users',
                localField: "notification.userId",
                foreignField: "_id",
                as: "userinfo"
            }
        },
        {
            $lookup: {
                from: 'posts',
                localField: "notification.postId",
                foreignField: "_id",
                as: "postinfo"
            }
        },
        {
            $project:{
                userId:'$userinfo._id',
                username:'$userinfo.userName', 
                userProfil:'$userinfo.profilePic',
                post:'$postinfo.Post', 
                type:'$notification.type',    
                date:'$notification.CreatedAt',  
            } 
        },  
        {
            $sort:{createdAt:-1}
        },
        { $limit : 5 }
    ]).then((response)=>{ 
        // console.log(response,"hello google");
        res.status(200).json(response)
    })
    },
  notificationAdd:(req,res,next)=>{
        console.log(req.body,"hello google");  
        console.log("notification");
        Notification.find({userId: ObjectId(req.body.receiverId) }).then(async (response) => {
            if (response.length > 0) {
                Notification.updateOne({userId: ObjectId(req.body.receiverId)}, {
                    $push: {
                        notification: {
                            type: req.body.type,
                            userId: ObjectId(req.body.userId),
                            postId: ObjectId(req.body.postId),
                        }
                    }   
                }).then(()=>{
                    res.json({ status: true, message: "Notificatoin added susseccfully" })
                })  
            } else { 
                console.log("new");
                await new Notification({  
                    userId: ObjectId(req.body.receiverId),
                    notification: {
                        type: req.body.type,
                        userId: ObjectId(req.body.userId),
                        postId: ObjectId(req.body.postId),
                    }
                }).save().then(async (response) => {
                res.json({ status: true, message: "Notificatoin added susseccfully" })
                }) 
            
            }
        }).catch((err) => {
            res.status(500).json({message:err.message})
        })
    },

   signup: async (req, res, next) => {
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)
    const signedUpUser = await new User({
        name: req.body.firstName,
        userName: req.body.userName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        password: securePassword
    })


    signedUpUser.save().then((response) => {
        const sendOtp = () =>{
            otp = Math.random();
            otp = otp * 10000;
            otp = parseInt(otp)
            mailer(otp,response.email,response._id).then((response)=>{
                console.log(response);
                return(response)
            })
        }
    
            sendOtp()
         console.log(sendOtp(),"hooo");
        res.status(200).json({ msg: "Successfully signed up" })
    })
},
verifyOtp:async (req, res) => {
    console.log(req.body.mailid,"body");
    const oneTimePass = req.body.otp.join("")
    console.log(oneTimePass,"otp");
    const user = await User.findOne({email:req.body.mailid})
   console.log(user);
   if(user.verified){
   console.log('otp is verified');
    res.status(500).send({message:"email id already verified"}) 
   }else{
    verifyOtp.findOne({userId:user._id}).then((response)=>{
        bcrypt.compare(oneTimePass, response.otp).then((response)=>{
           User.updateOne({_id:user._id},{
               $set:{
                   verified:true
               }
            }).then(()=>{
                res.status(200).json({msg:"otp otp verified successfully"})
            }) 
        })
    })
    
   }
},
verifyOtpForgot:async (req, res) => {
    console.log(req.body.mailid,"body");
    const oneTimePass = req.body.otp.join("")
    console.log(oneTimePass,"otp");
    const user = await User.findOne({email:req.body.mailid})
   console.log(user);
    verifyOtp.findOne({userId:user._id}).then((response)=>{
        bcrypt.compare(oneTimePass, response.otp).then((response)=>{
           User.updateOne({_id:user._id},{
               $set:{
                   verified:true
               }
            }).then(()=>{
                res.status(200).json(user)
            }).catch((err)=>{
                res.status(500).json({msg:"you entered wrong otp"})

            })
        }).catch((err)=>{
            res.status(500).json({msg:"something went wrong"})
        })
    })
    
   
},
Userlogin :  async (req, res) => {
    const user = await User.findOne({ email: req.body.userName,verified:true})
    if (user) {
        const validPassword = await bcrypt.compare(req.body.password, user.password).then()
        if (validPassword) {
            req.session.userSession = user

            const token = jwt.sign({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userId:user._id
            }, process.env.JWTPRIVATEKEY, {
                expiresIn: 1000 * 60 * 60 * 24
            });


            res.status(200).json({ token, user, status: true });

        } else {
            res.json({ status: false })
        }
    } else {
        res.json({ status: false })
    }

},userProfile:(req,res,next)=>{
    log("post here")
    const userId= req.params.id;
    console.log("post is herr",userId);
     User.findOne({_id:userId}).populate("post").populate('following').populate('followers').then((response)=>{
      console.log(response,'hhhe');
      const finalPost=response
      const post = response?.post
      const convertedPost = []

    post.forEach((eachPost)=>{
        convertedPost.push(
            {
                ...eachPost._doc,
                post: fs.readFileSync(`./StaticFiles/postImages/${eachPost.Post}`, 'base64')
            }
        ) 

    })
    finalPost.converted=convertedPost
        res.status(200).json({response,convertedPost})
     }).catch((err)=>{
         console.log(err);
         console.log(err,'hhhe...............');
        res.status(404).json({msg:'user not found'})
     })
},
followHandler:(req,res,next)=>{
    console.log(req.body);
    let {currentUser,user}= req.body
    User.findOne({_id:user,followers: { 
        $elemMatch: { 
            $eq:currentUser
        }
    }}).then((response)=>{
        console.log(response,'user found');
        if(response===null){
            User.updateOne({_id:user},{
                $push:{
                      followers:ObjectId(currentUser)
                      }
            }).then((response)=>{
                User.updateOne({_id:currentUser},{
                    $push:{
                          following:ObjectId(user)
                          }
                }).then(()=>{
    
                    console.log("successfully pushed");
                    res.status(200).json({message:"hello siri"})
                })
                
                
            }).catch((err)=>{console.log(err,"error")})
            res.status(500)
           }else{
            User.updateOne({_id:user},{
                $pull:{
                      followers:ObjectId(currentUser)
                      }
            }).then((response)=>{
                User.updateOne({_id:currentUser},{
                    $pull:{
                          following:ObjectId(user)
                          }
                }).then(()=>{
    
                    console.log("successfully pulled");
                    res.status(200).json({message:"hello google"})
                })
            }).catch((err)=>{console.log(err,"error");})
            res.status(400)
           }        
    })
    },
    getProf:(req,res,next)=>{
        console.log(req.params.key,"heeesss");
        User.find({name:{$regex:/`${req.params.key}`/,$options:'i'}}).then((response)=>{
            console.log(response);
        })
        },

        profileEdit:(req,res,next)=>{
       try {
        console.log('.....................................');
        let {name,userName,dateOfBirth,_id} = req.body
        let filename
            req.file ? filename = req.file.filename : ""
            User.updateOne({_id:_id},{$set:{
            name:name,
            userName:userName,
            profilePic:filename,
            dateOfBirth:dateOfBirth
        }

        }).then(()=>{
            res.status(200).json({messge:'profileUpdated'})
        }).catch((errr)=>{
            console.log(errr,"user not updated");
            res.status(500).json({message:"internal server error"})
        })
       }catch(err){
        console.log(err,'hello gooel');
       }

        },
        forgotPassword : (req,res,next)=>{
       try{
        console.log("mailer is here");
        let {email} = req.params
        User.findOne({email:email}).then((response)=>{
            console.log(response,"user is here");
            const sendOtp = () =>{
                console.log("mailer is here 2");
                otp = Math.random();
                otp = otp * 10000;
                otp = parseInt(otp)
                mailer(otp,response.email,response._id).then((response)=>{
                    console.log(response);
                    return(response)
                })
            }
                sendOtp()
                res.status(200).json({response})
        }).catch((err)=>{
            res.status(401).json({message:'email id is not verified'})
        })
       }catch(err){

       }
        },
        resetPassword:async(req,res,next)=>{
       try{
        let {password,userId} = req.body
        console.log(password,userId,"password");
        const saltPassword = await bcrypt.genSalt(10)
        const securePassword = await bcrypt.hash(password, saltPassword)
        User.updateOne({_id:userId},{
            $set:{
                password:securePassword
            }
        }).then((response)=>{
            console.log(response,"password resetted");
            res.status(200).json({message:"password reseted"})
        }).catch((error)=>{
            console.log(error,"password not resetted");
            res.status(500).json({message:"internal server error"})
        })
       }catch(error){
        res.status(500).json({message:"internal server error"})
       }

        }
    
}