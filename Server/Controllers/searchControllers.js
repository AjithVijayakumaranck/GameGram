const router = require("express").Router()
const bcrypt = require("bcrypt")
const { log } = require("console")
const mongoose = require('mongoose')
const { Comments } = require("../modals/commentModel")
const { Post } = require("../modals/postmodal")
const ObjectId = mongoose.Types.ObjectId
const fs = require('fs');
const { User } = require("../modals/signupModal")


module.exports = {
    search: (req,res,next)=>{   
        User.find({ name: { $regex: new RegExp(req.params.searchstring, 'i') }, otpStatus: true }).then((response) => {
            res.status(200).json(response)
        }).catch(console.error)
    }
}