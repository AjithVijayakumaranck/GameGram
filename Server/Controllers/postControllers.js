const router = require("express").Router()
const bcrypt = require("bcrypt")
const { log } = require("console")
const mongoose = require('mongoose')
const { Comments } = require("../modals/commentModel")
const { Post } = require("../modals/postmodal")
const ObjectId = mongoose.Types.ObjectId
const jwt  = require("jsonwebtoken")
const fs = require('fs');
const { User } = require("../modals/signupModal")


module.exports = {
   getSinglePost : (req,res,next)=>{
    let {postId} = req.params

    Post.findOne({_id:postId}).populate('holder').populate({
        path : 'comments',
        populate : {
          path : 'Owner'
        }
      }).then((response)=>{
        console.log(response,"here is your post");
        res.status(200).json(response)
      })
   },
   postLikeController : (req,res,next)=>{

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
},


setAllPosts:async(req, res, next) => {
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
},
uploadPost: async(req, res) => {
  let HolderId;
  console.log(req.body),'posimages';

  const token = req.body.userToken.split(' ')[1]

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
      User  .updateOne({_id:HolderId},{
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

}
}