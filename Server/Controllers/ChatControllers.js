const router = require("express").Router()
const bcrypt = require("bcrypt")
const { log } = require("console")
const mongoose = require('mongoose')
const { Comments } = require("../modals/commentModel")
const { Post } = require("../modals/postmodal")
const ObjectId = mongoose.Types.ObjectId
const fs = require('fs');
const { Conversation } = require("../modals/conversation")
const { Message } = require("../modals/message")


module.exports = {
    getChats :async (req,res,next)=>{ 
        User.findOne({_id:req.body.user,}).populate('following').populate('followers').then((response)=>{
            console.log(response,"response");
            res.status(200).json(response)
        })
    
    },
    createConversation : async (req,res,next)=>{
        console.log(req.body);
        let newConversation =await new Conversation({
            member:[req.body.senderId,req.body.recieverId]
        })
        try{
            const savedConversation = await newConversation.save()
            res.status(200).json(savedConversation)
    
        }catch(err){
            res.status(500).json(err)
        }
    },
    getConversation: async (req,res,next)=>{
        try{
            const  conversation = await Conversation.find({member:{
                $in:
                    [req.params.userId]
            }})
            res.status(200).json(conversation)
    
        }catch(err){
            res.status(500).json(err)
        }
    },
    addMessage: async (req,res,next)=>{
        console.log(req.body);
        const newMessage =await new Message(
          {conversationId:req.body.conversationId,
        sender:req.body.sender,
        text:req.body.text
    }
        )
        try{
          const savedMessage = await newMessage.save()
          res.status(200).json(savedMessage)
        }catch(err){
            res.status(500).json(err)
        }
    },
    getMessage : async (req,res,next)=>{
        console.log("hell gooogoo");
        console.log(req.params.conversationId,"hello");
        console.log('6374951eb2985a08e25beb10');
        try{
            const  allMessagges = await Message.find({conversationId:req.params.conversationId})
            console.log(allMessagges);
            res.status(200).json({allMessagges,messages:"google"})
    
        }catch(err){
            res.status(500).json(err)
        }
    }
}