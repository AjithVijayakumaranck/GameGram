const io = require('socket.io')(8800, {
    
    path: "/socket/socket.io",
    cors: {
        origin: "https://gamegram.ga"
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
};