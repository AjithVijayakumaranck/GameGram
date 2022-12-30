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
const authenticationControllers = require("../Controllers/authenticationControllers")
const ChatControllers = require("../Controllers/ChatControllers")
const searchControllers = require("../Controllers/searchControllers")
const ObjectId = mongoose.Types.ObjectId


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('file saving');
        cb(null, './StaticFiles/postImages')
    },
    filename: (req, file, cb) => {
        console.log('file saving');
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })


const verifyToken = (req, res, next) => {
    console.log(req.headers,"hello headers");
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {

        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
            if (err) {
             
                res.status(401).json({ auth: false, message: "you are failed to authenticate" });
            } else {
               console.log("successdfully verifies");
                req.userId = decoded.id;
                next();
            }
        });
    }
}





router.post('/handlelike/:id/:holderId',postControllers.postLikeController)




router.post('/isUserAuth',verifyToken,(req, res, next) => {
    res.status(200).json({ auth: true })
})


router.get('/test',(req,res)=>{
    res.json("hello google")
})

router.get('/recieveFile',verifyToken,postControllers.setAllPosts)

router.post("/uploadfile", upload.single('file'),postControllers.uploadPost)

//postControllers........................

router.post('/followhandler',verifyToken,authenticationControllers.followHandler)

router.post('/managecomment',verifyToken,CommentControllers.addComment)



//profileControllers ...................

router.post('/notification',authenticationControllers.notificationAdd)

router.get('/getNotification/:userId',authenticationControllers.getNotifications)

router.post('/signup',authenticationControllers.signup)

router.get('/forgotaccount/:email',authenticationControllers.forgotPassword)

router.post('/updateuserprofile',verifyToken,upload.single('file'),authenticationControllers.profileEdit)

router.post('/verifyOtp',authenticationControllers.verifyOtp)

router.post('/verifyOtpforgot',authenticationControllers.verifyOtpForgot)

router.post('/resetPassword',authenticationControllers.resetPassword)

router.post("/login",authenticationControllers.Userlogin)

router.get('/getuserprofile/:id',verifyToken,authenticationControllers.userProfile)

router.get('/getprof/:key',verifyToken,authenticationControllers.getProf)

//chatControllers .......................

router.post('/getchats',verifyToken,ChatControllers.getChats)

router.post('/createconversation',verifyToken,ChatControllers.createConversation)

router.get('/getconversation/:userId',verifyToken,ChatControllers.getConversation)

router.post('/addmessage',verifyToken,ChatControllers.addMessage)

router.get('/getmessages/:conversationId',verifyToken,ChatControllers.getMessage)

// CommentControllers .......................

router.post('/commentlikehandle',verifyToken,CommentControllers.commentLike)

router.post('/deleteComment',verifyToken,CommentControllers.deleteComment)


//postControllers .......................

router.get('/getpost/:postId',verifyToken,postControllers.getSinglePost)

//SearchControllers .....................

router.get('/search/:searchstring',verifyToken,searchControllers.search)




module.exports = router