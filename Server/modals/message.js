const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId


const messageSchema =  new mongoose.Schema({

conversationId:{
    type:String,
},
sender:{
    type:String
},
text:{
    type:String
}

},{ timestamps: true })

const Message=mongoose.model('messages',messageSchema)
module.exports={Message};