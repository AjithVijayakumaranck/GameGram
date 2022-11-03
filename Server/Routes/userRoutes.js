const router = require("express").Router()
const bcrypt = require("bcrypt")
const { User } = require('../modals/signupModal')
const jwt = require("jsonwebtoken")
const { response } = require("express")
const { mailer } = require("../mailer/mailer")
const multer = require('multer')
const { Post } = require('../modals/postmodal')
const fs = require('fs');
const { log } = require("console")
const mongoose= require('mongoose')
const ObjectId = mongoose.Types.ObjectId


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("stage 1");
        cb(null, './StaticFiles/postImages')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({ storage: fileStorageEngine })

router.post("/testmailer", (req, res) => {
    mailer()
})

const verifyToken = (req, res, next) => {

    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {
        console.log(token, "loooo");
        console.log("code in side the else");
        jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
            if (err) {
                console.log("token not valid");
                console.log(err, "loo");
                res.status(401).json({ auth: false, message: "you are failed to authenticate" });
            } else {
                console.log("token valied");
                req.userId = decoded.id;
                next();
            }
        });
    }
}

router.post('/handlelike/:id/:holderId',(req,res,next)=>{
    console.log(req.params.holderId);
    postId=req.params.id
    holderId=req.params.holderId
    // holderId=ObjectId(req.params.holderId)
    holdId=req.params.holderId
    console.log(holderId);
    // console.log(holdId);
    console.log(typeof holderId,"type");
    Post.findOne({_id:postId, likes: { 
        $elemMatch: { 
            $eq:holderId
        }
    }}).then((response)=>{
        console.log(response,'hoyya');
       if(response===null){
        console.log('code is here null');
        Post.updateOne({_id:postId},{
            $push:{
                  likes:ObjectId(holderId)
                  }
        }).then((response)=>{
            console.log(response);
            res.status(200).json({message:"hello siri"})
        }).catch((err)=>{console.log(err,"error")})
        res.status(500)
       }else{
        console.log('code is not here');
        Post.updateOne({_id:response._id},{
            $pull:{
                  likes:ObjectId(holderId)
                  }
        }).then((response)=>{
            res.status(200).json({message:"hello google"})
            console.log(response);
        }).catch((err)=>{console.log(err,"error");})
        res.status(400)
       }
       
    }).catch((response)=>{
        res.status(500)
        console.log(response,"err");
    })
})
    



// router.post('/handlelike/:id/:holderId',(req,res,next)=>{
//     console.log(req.params.holderId);
//     postId=req.params.id
//     holderId=req.params.holderId
//     Post.findOne({_id:postId}).then((response)=>{
//         const likeArray= response.likes
//         console.log(likeArray);
//             if(ObjectId(holderId) in likeArray){
//                 Post.updateOne({
//                     $pop:{
//                         likes:holderId
//                     }
//                 }).then((response)=>{
//                     console.log(response);
//                 })
//             }else{
//                 Post.updateOne({
//                     $push:{
//                         likes:holderId
//                     }
//                 }).then((response)=>{
//                     console.log(response);
//                 })
//             }
//         })
       
//         console.log(response,"hello");
//     })


router.post('/managecomments',(req,res,next)=>{
    res.status(200).json({ms})
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
  Post.find().populate('holder').then((response)=>{
   console.log(response,"populate");
     const posts=response
      const convertedPosts = [];
    
      posts.forEach( ( post ) =>{
       convertedPosts.push(
           {
               ...post._doc,
               post: fs.readFileSync(`./StaticFiles/postImages/${post.Post}`, 'base64')
           }
       ) 
      } )

      res.json({ post: convertedPosts})
  })
})

router.post('/signup', async (req, res, next) => {
    console.log(req.body);
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
        res.status(200).json({ msg: "Successfully signed up" })
    })
})
router.post('/sign', (req, res) => {
    res.send("hellp")
})

router.post("/uploadfile", upload.single('file'), async (req, res) => {
    console.log(req.body);
    let HolderId;
    const token = req.body.userToken.split(' ')[1]
    console.log(token);
 const auth=()=>{
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
        if (err) {
            console.log("token not valid");
            console.log(err, "loo");
            res.status(401).json({ auth: false, message: "you are failed to authenticate" });
        } else {
            console.log("token valied");
            console.log(decoded);
           HolderId = decoded.userId;
           console.log(HolderId,"booooo");
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
console.log(postTemplate);
    postTemplate.save().then((response) => {
        console.log(response, "hello response");
        res.send(200).json({msg:"success"})
    }).catch((error) => {
console.log(error);
    })

    // console.log(req.body);
})



router.post("/login", async (req, res) => {
    console.log("hello google", req.body.userName);
    const user = await User.findOne({ email: req.body.userName })
    if (user) {
        console.log("here is the code");
        const validPassword = await bcrypt.compare(req.body.password, user.password).then()
        if (validPassword) {
            req.session.userSession = user
            console.log(req.session.userSession._id, "hoooo");
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



module.exports = router