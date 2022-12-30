const io = require('socket.io')(8800, {
    
    path: "/socket/socket.io",
    cors: {
        origin: "https://gamegram.ga"
    }
},()=>{
    console.log("socket working");
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
    console.log(text,"live text");
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