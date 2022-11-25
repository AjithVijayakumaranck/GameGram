const router = require("express").Router()
const bcrypt = require("bcrypt")
const { log } = require("console")
const mongoose = require('mongoose')
const { Comments } = require("../modals/commentModel")
const { Post } = require("../modals/postmodal")
const ObjectId = mongoose.Types.ObjectId


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
   }
}