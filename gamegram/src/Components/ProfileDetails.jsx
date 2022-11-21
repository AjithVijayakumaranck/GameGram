import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const ProfileDetails = ({userDetails}) => 
{
  const Navigate = useNavigate()
    const [currentUser,setCurrentUser]= useState(undefined)
    console.log(userDetails,"user is here");
    // const {following} = userDetails
    // console.log(following,"h000");

    // const userSetter = async () => {
    //     const Cuser = await 
    //     setCurrentUser(localStorage.getItem("user"))  
    // }

    const handleMessageButton=(user,currentUser)=>{
      console.log(user,currentUser);
      axios.post("http://localhost:5000/createconversation",{senderId:currentUser,recieverId:user}).then(()=>{
        Navigate('/message')
      })
    }

    const followHandler = (user,currentUser) => {
axios.post("http://localhost:5000/followhandler",{user,currentUser}).then((response)=>{

}
)
    }
    
    useEffect(()=>{
  
        setCurrentUser(localStorage.getItem("user"))  
  

    },[])


  return (
    <div className="header flex flex-col md:flex-row items-center md:justify-center pt-2 gap-10 mt-[2rem]">
    <div className='rounded-full w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] bg-main flex items-center justify-center'>
    <div className='rounded-full w-[7rem] h-[7rem] md:w-[9rem] md:h-[9rem] bg-secondary flex items-center justify-center' />
    </div>
    <div className='flex flex-col justify-center'>
        <h1 className='text-white text-[2rem] font-light'>{userDetails.userName}</h1>
        <h1 className='text-white text-[1rem]  font-light'>{userDetails.name}</h1>
        <h1 className='text-white  font-light'>Valorant Player <span className='text-main'>@UnknownEsports</span></h1>
        <h1 className='text-white text-[.7rem] font-light pt-3 text-center md:text-start'>Website</h1>
        <a href="#" className='bg-contrast text-main rounded-full text-center mt-1'>www.gfxbot.co.in</a>
{
    currentUser === userDetails._id ? null :  <button className='rounded-md bg-contrast text-white mt-2' onClick={()=>{
  followHandler(userDetails._id,currentUser) 
    }}>
      
    follow
  </button>
  
}
{
    currentUser === userDetails._id ? null :  <button className='rounded-md bg-main text-dark  mt-2 ' onClick={()=>{
      handleMessageButton(userDetails._id,currentUser) 
         }}>Message</button>  
  
}
  
        
 
    </div>
    <div>

    </div>

  </div>
  )
}

export default ProfileDetails