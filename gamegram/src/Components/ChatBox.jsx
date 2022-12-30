import React, { useEffect, useState } from 'react'
import { ChatBubbleLeftRightIcon, ArrowUpOnSquareIcon, Bars2Icon, Bars3BottomLeftIcon, PhotoIcon, FaceFrownIcon, FaceSmileIcon, PaperAirplaneIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Bars3Icon } from '@heroicons/react/24/solid'
import axios from 'axios'
import Conversation from './Conversation'
import MessageBox from './messsageDilog'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const a = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,]



const ChatBox = ({ conversation,currentUser,currentChat,setCurrentChat,messages,setMessages,messageSubmitHandler,typingMessage,setTypingMessage}) => {

    const ChangeCurrentChat=(conversate)=>{
        console.log(conversate,"current chatSS");
        setCurrentChat({...currentChat,...conversate[0]})
       


    }

    const [search, setSearch] = useState('')
    const searchHandler = (e) => {
        console.log(search, "hello");
        const getChat = () => {
            console.log(search, "sea5rchg is here");
            axios.get(`https://gamegram.ga/api/getprof/${search}`).then((response) => {
            })
        }
        getChat()
    }

    return (
        <div className='flex  w-[55rem] h-[37rem] bg-dark text-white overflow-hidden'>
            <div className='min-w-[15rem] overflow-hidden'>
                <div className='w-full h-[5rem] flex justify-between items-center px-4 '>
                    <h2 className=' text-2xl font-medium'>Chats</h2>
                    {/* <input type="text" value={search} className='bg-secondary outline-none mx-3 text-sm py-1 px-3 w-full rounded-md' onChange={(e) => {
                        setSearch(e.target.value)
                    }} name="" id="" />
                    <MagnifyingGlassIcon onClick={(e) => {
                        searchHandler(e)
                    }} className='w-8 text-main font-semibold cursor-pointer' /> */}
                </div>
                <div className='h-[2rem] bg-secondary flex justify-center  px-[5rem] items-center' >
                    <h2 className=' text-sm font-medium'>general chat</h2>
                    {/* <h2 className=' text-sm font-medium'>group chat</h2> */}
                </div>
                <div className='h-[33rem] divScroll overflow-y-auto'>



                  
                       {
                       conversation.length==0 ?<p>No active conversation</p>:
                       
                        conversation[0].map((conversate)=>{
                            console.log(conversation,"conversations");
                            console.log(conversate,"each conver");
                            console.log(conversation[0].length);
                            // console.log(currentUser,"current user");
                            return(
                         
                                  <Conversation conversation={conversate} currentUser={currentUser} currentChat={currentChat} setCurrentChat={setCurrentChat}/>
                           

                            )
                        })
                       }
                      
               



                </div>

            </div>
            {currentChat ?
                <MessageBox  currentChat={currentChat} messages={messages} setMessages={setMessages} currentUser={currentUser} messageSubmitHandler={messageSubmitHandler} typingMessage={typingMessage} setTypingMessage={setTypingMessage}/>: <div className='flex w-full h-full justify-center items-center'>
            open a conversation
            </div>
            }
        </div>
    )
}

export default ChatBox