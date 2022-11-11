const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId

// const LikeSchema = new mongoose.Schema({like:{type:ObjectId}});
// const LikeSh=mongoose.model('Like',LikeSchema)

const PostModal =  new mongoose.Schema({
    caption:{
        type:String,
    },
    Post:{
        type:String,
        required:true,
    },
    likes:[{
        type:ObjectId
    }],

    comments:[{ type:ObjectId, ref:"Comment"}],
    holder:{
        type:ObjectId,
        required:true,
        ref:'users'
    }
},{ timestamps: true })

const Post=mongoose.model('Posts',PostModal)

module.exports={Post};