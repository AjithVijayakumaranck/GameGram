const router = require("express").Router()
const bcrypt = require("bcrypt")
const { User } = require('../modals/signupModal')
const jwt = require("jsonwebtoken")
const { response } = require("express")
const { mailer } = require("../mailer/mailer")
const multer = require('multer')
const { Post } = require('../modals/postmodal')
const fs = require('fs');
const {verifyOtp} = require('../modals/otpModal')
const {Conversation} = require('../modals/conversation')
const {Message} = require('../modals/message')

const { log } = require("console")
const mongoose= require('mongoose')
const { Comments } = require("../modals/commentModel")
const CommentControllers = require("../Controllers/CommentControllers")
const postControllers = require("../Controllers/postControllers")
const ObjectId = mongoose.Types.ObjectId


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
       
        cb(null, './StaticFiles/postImages')
    },
    filename: (req, file, cb) => {

        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

router.post("/testmailer", (req, res) => {
    mailer()
})



const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {

        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
            if (err) {
             
                res.status(401).json({ auth: false, message: "you are failed to authenticate" });
            } else {
          
                req.userId = decoded.id;
                next();
            }
        });
    }
}

router.post('/handlelike/:id/:holderId',(req,res,next)=>{

    postId=req.params.id
    holderId=req.params.holderId
    // holderId=ObjectId(req.params.holderId)
    holdId=req.params.holderId

    Post.findOne({_id:postId, likes: { 
        $elemMatch: { 
            $eq:holderId
        }
    }}).then((response)=>{
       if(response===null){
        Post.updateOne({_id:postId},{
            $push:{
                  likes:ObjectId(holderId)
                  }
        }).then((response)=>{
            res.status(200).json({message:"hello siri"})
        }).catch((err)=>{console.log(err,"error")})
        res.status(500)
       }else{
        Post.updateOne({_id:response._id},{
            $pull:{
                  likes:ObjectId(holderId)
                  }
        }).then((response)=>{
            res.status(200).json({message:"hello google"})
        }).catch((err)=>{console.log(err,"error");})
        res.status(400)
       }
       
    }).catch((response)=>{
        res.status(500)
    })
})




router.post('/isUserAuth', verifyToken, (req, res, next) => {
    res.status(200).json({ auth: true })
})

router.get('/recieveFile', async(req, res, next) => {
 
//   let postpop = await Post.find().populate('holder');
//   console.log(postpop); 
// const follwers = User.finbd({id:})
// const following =  User.find()
// copnst  customarray = [ ..folloers, ...following]
// holder._id: { in : customarray}
  Post.find().populate('holder').populate({
    path : 'comments',
    populate : {
      path : 'Owner'
    }
  }).sort({createdAt:-1}).then((response)=>{
     const posts=response
      const convertedPosts = [];
      posts.forEach( ( post ) =>{
       convertedPosts.push(
           {
               ...post._doc,
               post: fs.readFileSync(`./StaticFiles/postImages/${post.Post}`, 'base64')
           }
       ) 
      } );
      res.json({ post: convertedPosts})
  })
})

router.post('/signup', async (req, res, next) => {
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
})
router.post('/verifyOtp',async (req, res) => {
    console.log(req.body.mailid,"body");
    const oneTimePass = req.body.otp.join("")
   const user = await User.findOne({email:req.body.mailid})
   console.log(user);
   if(user.verified){
    res.status(500).send({message:"email id already verified"}) 
   }else{
    // console.log(userId);
    // console.log(user);
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
})

router.post("/uploadfile", upload.single('file'), async (req, res) => {
    console.log(req.body);
    
    let HolderId;
    console.log(req.body.userToken);
    const token = req.body.userToken.split(' ')[1]
    console.log(token,'helllo');
    const auth=()=>{
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
            if (err) {
                console.log(err.message,"error is here");
                res.status(401).json({ auth: false, message: "you are failed to authenticate" });
            } else {
        
               HolderId = decoded.userId;
              return;
            }
        });
     }

 auth()

    const postTemplate = await new Post({
        caption: req.body.Caption,
        Post: req.file.filename,
holder:HolderId
    })

    postTemplate.save().then((response) => {
        console.log(response, "hello response");
        User.updateOne({_id:HolderId},{
            $push:{
                post:response._id
            }
        }).catch((error)=>{
            console.log(error);
        })
        res.status(200).json({msg:"success"})
    }).catch((error) => {
console.log(error);
    })

})



router.post("/login", async (req, res) => {
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

})


router.get('/getuserprofile/:id',(req,res,next)=>{
    log("post here")
    const userId= req.params.id;
    console.log("post is herr",userId);
     User.findOne({_id:userId}).populate("post").then((response)=>{
      console.log(response,'hhhe');
      const finalPost=response
      const post = response.post
      const convertedPost = []

    post.forEach((eachPost)=>{
        convertedPost.push(
            {
                ...eachPost._doc,
                post: fs.readFileSync(`./StaticFiles/postImages/${eachPost.Post}`, 'base64')
            }
        ) 

    })
    
   

    // console.log(convertedPost,"convert");
    finalPost.converted=convertedPost
    // console.log(finalPost,"converted Posts");
        res.status(200).json({response,convertedPost})
     }).catch((err)=>{
         console.log(err);
         console.log(err,'hhhe...............');
        res.status(404).json({msg:'user not found'})
     })
})

router.post('/managecomment',CommentControllers.addComment)


router.post('/followhandler',(req,res,next)=>{
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
})


router.get('/getprof/:key',(req,res,next)=>{
console.log(req.params.key,"heeesss");
User.find({name:{$regex:/`${req.params.key}`/,$options:'i'}}).then((response)=>{
    console.log(response);
})
})

router.post('/getchats',(req,res,next)=>{
   
    User.findOne({_id:req.body.user,}).populate('following').populate('followers').then((response)=>{
        console.log(response,"response");
        res.status(200).json(response)
    })

})

router.post('/createconversation', async (req,res,next)=>{
    console.log(req.body);
    let newConversation =await new Conversation({
        member:[req.body.senderId,req.body.recieverId]
    })
    try{
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)

    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/getconversation/:userId',async (req,res,next)=>{
    try{
        const  conversation = await Conversation.find({member:{
            $in:
                [req.params.userId]
        }})
        res.status(200).json(conversation)

    }catch(err){
        res.status(500).json(err)
    }
})

router.post('/addmessage', async (req,res,next)=>{
    console.log(req.body);
    const newMessage =await new Message(
      {conversationId:req.body.conversationId,
    sender:req.body.sender,
    text:req.body.text
}
    )
    try{
      const savedMessage = await newMessage.save()
      res.status(200).json(savedMessage)
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/getmessages/:conversationId',async (req,res,next)=>{
    console.log("hell gooogoo");
    console.log(req.params.conversationId,"hello");
    console.log('6374951eb2985a08e25beb10');
    try{
        const  allMessagges = await Message.find({conversationId:req.params.conversationId})
        console.log(allMessagges);
        res.status(200).json({allMessagges,messages:"google"})

    }catch(err){
        res.status(500).json(err)
    }
})

// commentRoutes .......................

router.post('/commentlikehandle',CommentControllers.commentLike)

router.post('/deleteComment',CommentControllers.deleteComment)


//postControllers .......................

router.get('/getpost/:postId',postControllers.getSinglePost)

module.exports = router