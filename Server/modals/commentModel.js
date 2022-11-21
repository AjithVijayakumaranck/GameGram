const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId


const CommentSchema =  new mongoose.Schema({

comment:{
    type:String,
    required:true
},
reply:[{
    type:ObjectId
}],
Post:{
    type:ObjectId,
    required:true
},
likes:[{
    type:ObjectId,
    ref:'users'
}],
Owner:{
    type:ObjectId,
    ref:'users'
}

},{ timestamps: true })

const Comments=mongoose.model('Comments',CommentSchema)
module.exports={Comments};