const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const connection = require('./Connections/db')
const userRoutes = require('./Routes/userRoutes')
const adminRoutes = require('./Routes/AdminRoutes')
const mongoose = require('mongoose')
let bodyParser = require('body-parser');
const session = require('express-session')
const http = require('http')
const { Server } = require('socket.io')
const { log } = require('console')

app.use(cors())
app.use(express.json())
app.use('/images',express.static('StaticFiles'))
// app.use('/images',express.static())
const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin:'http://localhost:3000'
  }
})

let users = []



const addUser = (userId,socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};


const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};


const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

const getAllUsers = (userId) => {
  console.log(userId,"hello users");
  console.log(users,"hello users....................");
  return users
  // return users.find((user) => {
  //   console.log(userId.userId,"hello suuuuusdsaaaaaaaaaaaaaa");
  //   console.log(user.userId.userId,"hello suuuuu");
  //   user.userId.userId !== userId.userId});
};





io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  
  socket.on("addUser", (userId) => {
    console.log(userId,"eeee rrrrrrrrrrrrrrrrrrrr");
    addUser(userId,socket.id);
    io.emit("getUsers", users);
  });

socket.on("sendMessage",({userId,receiverId,text})=>{
     const user = getUser(receiverId)
    
     io.to(user?.socketId).emit('getMessage',{
      userId,text
     })
})

  socket.on("getAllUsers",async(userId)=>{
  const allUsers=await getAllUsers(userId)
  console.log(allUsers,"online users");
  io.emit('getusersAll',{
  allUsers
   })
})
 
socket.on("disconnect",async()=>{
  console.log("user disconnected");
  removeUser(socket.id)
  console.log(users,"online users");
  io.emit('getusersAll',{
  users
   })
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
app.use('/admin',adminRoutes)

server.listen(5000,()=>{
    console.log("server running on port 5000");
})
