import axios from 'axios'


import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
    const [notificationResult,setNotificationResult]=useState([])
  const navigate = useNavigate()
  useEffect(() => {
  axios.get(`http://gamegram.ga/api/getNotification/${localStorage.getItem('user')}`).then((response=>{
console.log(response.data,"hello google ");
setNotificationResult([...response.data])
  }))
  }, [])
  
  
  return (
    <div className='flex justify-center  '>
        <div className='ml-[43rem] absolute  top-[60px] min-w-[15rem] flex flex-col bg-dark py-3 text-dark rounded'>
     {

        notificationResult?.length==0?<p className='text-main text-center '>You have no notification</p>:

         notificationResult.map((result)=>{
 
       return(
    result.type == 'follow' ?     <div className='flex px-1 items-center py-2'>
    <div className='w-8 h-8 bg-main rounded-full'>
    </div>
    <p className='pl-3 cursor-pointer text-main' onClick={()=>{
         navigate(`/userprofile/${result.userId}`)
          }}>{result.username} <span className=' text-white text-xs'>Followed You</span></p>
  </div> :     <div className='flex px-1 items-center py-2'>
          <div className='w-8 h-8 bg-main rounded-full'>
          </div>
          <p className='pl-3 cursor-pointer text-main' onClick={()=>{
         navigate(`/userprofile/${result.userId }`)
          }}>{result.username} <span className=' text-white  text-xs'>Liked your post</span></p>
          <img src={`http://gamegram.ga/api/images/postimages/${result.post}`} className='w-12 mx-2 rounded-sm' alt="" />
        </div>
       )
      })
     }
         </div>
    </div>
  )
}

export default Notification