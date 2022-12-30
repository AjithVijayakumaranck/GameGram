import { Bars2Icon, FaceSmileIcon, PaperAirplaneIcon, PhotoIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import Messages from './Messages'

const MessageBox = ({currentChat,messages,setMessages,currentUser,typingMessage,setTypingMessage,messageSubmitHandler}) => {
    const scrollRef = useRef();
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    
    
//     const messageSubmitHandler = () =>{
//    console.log(typingMessage,"hello");
//   axios.post('https//gamegram.ga/api/addmessage',{
//     conversationId:currentChat._id,
//     sender:currentUser,
//     text:typingMessage
//   }).then((response)=>{
//     console.log('leee');
//     console.log(response);
//     setMessages([...messages,response.data])
//      setTypingMessage("")
//   })
//     }

  useEffect(()=>{
    
    console.log(currentChat._id,"chat id");
    axios.get(`https//gamegram.ga/api/getmessages/${currentChat._id}`).then((response)=>{
        console.log(response.data.allMessagges,"hell9o google");
        setMessages([...response.data.allMessagges]);
       })

  },[currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className='bg-lightContrast w-full   justify-between top-0 left-0 right-0 relative z-10 '>
                <div className='h-[3.5rem] bg-dark text-center z-10  w-full z-11'>
                    <h1 className='text-xl flex items-center justify-center h-full'>
                        <div className='text-center w-full  relative '>
                            <p className=''>{currentChat.name}</p>
                            <div className='absolute top-0 right-4'>
                                <Bars2Icon className='text-main w-5' />
                            </div>
                        </div>
                    </h1>
                </div>
                <div className=' divScroll justify-end h-[33.5rem] py-3 px-4 absolute z-9 overflow-y-auto bottom-0 w-full'>
           {messages.map((message)=>{
        // console.log(message.sender,currentUser);
        // console.log(message.sender === currentUser,"each message");
        
        return(
            <div ref={scrollRef}>
        <Messages message={message}  own={message.sender === currentUser} />
        </div>)
      })}
      </div>
                <div className='h-[3.5rem] bg-dark text-center absolute bottom-0  w-full'>
                    <div className='flex items-center h-full px-5'>
                        <label htmlFor="chatFile"> 
                        {/* <PhotoIcon className='text-main w-5' /> */}
                        </label>
                        <input type="file" name="" id="chatFile" className='hidden' />
                        <div className='bg-secondary w-full flex items-center mx-2 rounded-full rounded-br-sm px-3' >
                            <FaceSmileIcon className='w-5 text-main' />
                            <input type="text" name="" value={typingMessage} id="" onChange={(e)=>{
                                console.log(typingMessage," set typinggg");
                                setTypingMessage(e.target.value)
                            }} className='bg-transparent outline-none text-sm py-2 px-3 w-full' placeholder='message here' required />
                        </div>
                        <button className='bg-main rounded-full rounded-tl-sm text-dark px-4 py-1' onClick={messageSubmitHandler}>
                            <div className='flex gap-2 font-semibold'>
                                send <PaperAirplaneIcon className='w-5 ' />
                            </div>
                        </button>
                    </div>
                </div>

            </div>
  )
}

export default MessageBox