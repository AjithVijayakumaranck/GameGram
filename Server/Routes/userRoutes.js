const router = require("express").Router()
const bcrypt = require("bcrypt")
const {User} = require('../modals/signupModal')
const jwt = require("jsonwebtoken")
const { response } = require("express")

// router.post('/isUserAuth',(req,res,next)=>{
//     console.log(req.headers);
//     console.log(req.body,"body");
//     console.log("heoooo",req.headers.authorization.split(' ')[1],"hoo");
//     jwt.verify(req.headers.authorization.split(' ')[1],process.env.JWTPRIVATEKEY,( err, decoded )=>{
//         console.log(err,"boooo");
//         console.log(decoded,"yoooo");
//          if( err) return res.status(401).json({message:" Token is Invalid",
//          isAuth:false});
//         console.log("logggg");
//         return res.status(200).json({message:" Token is valid",
//         isAuth:true});

//     })
// })
const verifyToken = (req,res,next)=>{
    console.log(req.headers);
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
        res.send("We need a token, please give it to us next time");
    } else {
        console.log(token,"loooo");
    console.log("code in side the else");
       jwt.verify(token,process.env.JWTPRIVATEKEY, (err,decoded) => {
           if (err) {
               console.log("token not valid");
               console.log(err,"loo");
               res.status(401).json({ auth: false, message: "you are failed to authenticate"});
           } else {
            console.log("token valied");
               req.userId = decoded.id;
               next();
           }
       });
   }
}

router.post('/isUserAuth',verifyToken,(req,res,next)=>{
    res.status(200).json({auth:true})
})

router.post('/signup',async (req,res,next)=>{
    console.log(req.body);
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password,saltPassword)
    const signedUpUser= await new User({
        name:req.body.firstName,
        userName:req.body.userName,
        email:req.body.email,
        dateOfBirth:req.body.dateOfBirth,
        password:securePassword
})

signedUpUser.save().then((response)=>{
    res.status(200).json({msg:"Successfully signed up"})
})
})



router.post("/login",async(req,res)=>{
    console.log("hello google",req.body.userName);
    const user = await User.findOne({email:req.body.userName})
    if(user){
        console.log("here is the code");
     const validPassword= await bcrypt.compare(req.body.password,user.password)
     if(validPassword){
       const token = jwt.sign({
             firstName:user.firstName,
             lastName:user.lastName,
             email:user.email,
         },process.env.JWTPRIVATEKEY,{
             expiresIn:1000*60*60*24
         });

     res.status(200).json({token,user,status:true});

     }else{
          res.json({status:false})
     }
    }else{
         res.json({status:false} )
    }

})



module.exports = router