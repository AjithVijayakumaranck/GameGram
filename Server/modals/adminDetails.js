const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId

const adminTemplate =  new mongoose.Schema({

    email:{
        type:String,
        required:true
    },
 password:{
        type:String,
        required:true
    }
})

const Admin=mongoose.model('admin',adminTemplate)

module.exports={Admin};