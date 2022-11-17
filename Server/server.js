const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const connection = require('./Connections/db')
const userRoutes = require('./Routes/userRoutes')
const mongoose = require('mongoose')
let bodyParser = require('body-parser');
const session = require('express-session')
const http = require('http')
const { Server } = require('socket.io')
const { log } = require('console')

app.use(cors())
app.use(express.json())

const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin:'http://localhost:3000'
  }
})

let users = []

const addUser = (userId,socketId) => {
console.log("adding user ...........................");
  !users.some(user=>user.userId=== userId) && users.push({userId,socketId})

}

const removeUser = (socketId) => {
  user = users.filter(user=>user.socketId !== socketId)
}

const getUser = (userId) => {
  console.log(users,'userss');
  console.log(userId,"serID");
  return users.find(user => user.userId === userId)

  
}



io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    console.log(userId),"---------------------------------";
    addUser(userId,socket.id);
    io.emit("getUsers", users);
  });

socket.on("sendMessage",({userId,receiverId,text})=>{
     const user = getUser(receiverId)
     console.log(userId,receiverId,text,"hello google");
     console.log(user,"socket user ........................");
     console.log(user.socketId,"socket user ........................");
     io.to(user.socketId).emit('getMessage',{
      userId,text
     })
})
 
socket.on("disconnect",()=>{
  console.log("user disconnected");
  removeUser(socket.id)
})


})


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static('./Server')) 
const oneDay = 1000 * 60 * 60 * 24;


dotenv.config()
connection()

app.use(session({
    secret: 'gameGRam00002ks',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: oneDay }
  }))




app.use('/',userRoutes)

server.listen(5000,()=>{
    console.log("server running on port 5000");
})
