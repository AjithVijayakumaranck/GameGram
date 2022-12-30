const router = require("express").Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { log } = require("console")
const mongoose = require('mongoose')
const { Comments } = require("../modals/commentModel")
const { Post } = require("../modals/postmodal")
const ObjectId = mongoose.Types.ObjectId


module.exports = {

    addComment: async (req, res, next) => {
        try {
            const { index, CurrentComment, postId, holderId } = req.body
            console.log(holderId, "holder here    ..............");
            console.log(req.body, "hello comments");
            let SaveComment = new Comments({
                comment: CurrentComment[1],
                Post: postId,
                Owner: holderId
            })
            SaveComment.save().then((response) => {
                console.log(response);
                Post.updateOne({ _id: postId }, {
                    $push: {
                        comments: response._id
                    }
                }).then((response) => {
                    console.log(response);
                    res.status(200).json({message:"commented"})
                })
            }).catch((error) => {
                console.log(error);
                res.status(500).json({ message: error.json })
            })
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.json })
        }

    },
    commentLike: (req, res, next) => {
try{

    let { commentId, userId } = req.body

    Comments.findOne({_id:commentId, likes: { 
         $elemMatch: { 
             $eq:userId
         }
     }}).then((response)=>{
         if(!response){
             Comments.updateOne({_id:commentId},{
                 $push:{
                     likes:ObjectId(userId)
                 }
             }).then(()=>{
                console.log('liked');
                 res.status(200).json({message:'user liked the comment'})

             }).catch((err)=>{
                console.log('like error');
                res.status(500).json({message:err.message})
             })
         }else{
             Comments.updateOne({_id:commentId},{
                 $pull:{
                     likes:ObjectId(userId)
                 }
             }).then(()=>{
                console.log('disliked');
                 res.status(200).json({message:'user disliked the comment'})
             }).catch((err)=>{
                console.log('dislike error');
                res.status(500).json({message:err.message})
             })
         }
     })
}catch(err){

}

    },
    deleteComment : (req,res,next)=>{
    console.log(req.body);
        try{
       let {commentId,postId} = req.body
      Post.findOneAndUpdate({_id:postId},{
        $pull:{
            comments:commentId
        }
      }).then((response)=>{
        console.log(response,"helpp deleted comments");
        res.status(200).json({message:"delted successfully"})
      })

   }catch(err){

   }
    }

}


