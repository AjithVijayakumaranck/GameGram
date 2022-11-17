
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId


const ConversationSchema =  new mongoose.Schema({

member:{
    type:Array,
}

},{ timestamps: true })

const Conversation=mongoose.model('Conversation',ConversationSchema)
module.exports={Conversation };