import axios from 'axios'
import React, { useRef } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import ChatBox from '../Components/ChatBox'
import Navbar from '../Components/navbar'
import {io} from 'socket.io-client'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


const Chatingwindow = () => {
  const [typingMessage,setTypingMessage]=useState(null)
  const socket = useRef()
  const [chat,setChats]=useState([])
  const [currentChat,setCurrentChat]=useState(null)
  const [messages,setMessages]=useState([])
  const [currentUser,setCurrentUser]=useState('')
  const [arrivalmessge,setArrivalMessge]=useState(null)
  const user= localStorage.getItem('user')
  const [state,setState]=useState(false)



// useEffect(()=>{
//     socket.current = io.connect("http://localhost:5000")
//     console.log("data.................");


//    socket.current.on("getMessage", (data) => {
//        console.log("INSIDE SOCKET.................");
//       setArrivalMessge({
//       sender: data.senderId,
//       text: data.text,
//       createdAt: Date.now(),
//     });
//   })
//     // getNewMessage()
// },[])
  

useEffect(()=>{
    // socket.current = io.connect("https://gamegram.ga/api")
    socket.current = io.connect("https://gamegram.ga/api",{path:"/socket/socket.io"});
    socket.current.on("getMessage",(data) =>{
      console.log(data.text,"hello google liev text");
      setArrivalMessge({
        sender: data.userId,
        text:data.text,
        createdAt:Date.now()
      })
    })
},[])
  



useEffect(()=>{
  console.log("message arrived");
  console.log(messages,"message asdadadas");
  arrivalmessge && currentChat ?.member.includes(arrivalmessge.sender) && 
   setMessages((prev) => [...prev,arrivalmessge]);
  //  setState(!state)
},[arrivalmessge,currentChat]);


  useEffect(()=>{
    socket.current.emit("addUser",user)
    socket.current.on("getUsers",users=>{
      console.log(users,"users....................");
    })
    },[user])






    const getChats = async () => {
      setCurrentUser(user)
       axios.get(`https://gamegram.ga/api/getconversation/${user}`).then((response)=>{
         console.log(response.data,"here is the conversations");
          setChats([...chat,response.data])
          console.log(chat,'cvharr');
       })
     }
     
     
     
       useEffect(()=>{
          getChats()
         
       },[])

const messageSubmitHandler = () =>{

  const receiverId = currentChat.member.find(member=> member !== user)
  console.log(user,"userrrrr.................");
  console.log(typingMessage,"typee.................");

  console.log(typingMessage,"hello");
 axios.post('https://gamegram.ga/api/addmessage',{
   conversationId:currentChat._id,
   sender:currentUser,
   text:typingMessage
 }).then((response)=>{
  socket.current.emit("sendMessage",{
    userId:localStorage.getItem('user'),
    receiverId,
    text:typingMessage
  })
   console.log('leee');
   console.log(response);
   setMessages([...messages,response.data])
    setTypingMessage("")
 })
   }






  return (
    <div>
        <div>
            <Navbar />
        </div>
        <div className='flex justify-center pt-7 '>
    
           <ChatBox conversation={chat} currentUser={currentUser} currentChat={currentChat} setCurrentChat={setCurrentChat} messages={messages} setMessages={setMessages} messageSubmitHandler={messageSubmitHandler} typingMessage={typingMessage} setTypingMessage={setTypingMessage}/>
                      
        </div>
    </div>
  )
}

export default Chatingwindow