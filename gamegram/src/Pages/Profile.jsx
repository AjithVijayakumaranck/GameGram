import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/navbar'
import Profilepost from '../Components/Profilepost'

const Profile = () => {
  let {id} =  useParams()
  const [userDetails,setUserDetails]= useState({})
  const [userPosts,setuserPosts]= useState([])
  useEffect(() => {
    console.log(id,"hello google");
    const userId = id
    axios.get(`http://localhost:5000/getuserprofile/${userId}`).then((response)=>{
      console.log(response.data);
      setUserDetails({...userDetails,...response.data.response})
      setuserPosts([...userPosts,...response.data.convertedPost])
    }).catch((err)=>{
      console.log(err);
    })
  }, [])
  
  return (
    <div className='overflow-auto divScroll h-screen'><div>
        <Navbar/>
    </div>
      <div className="header flex flex-col md:flex-row items-center md:justify-center pt-10 gap-10 mt-[5rem]">
        <div className='rounded-full w-[10rem] h-[10rem] md:w-[17rem] md:h-[17rem] bg-main flex items-center justify-center'>
        <div className='rounded-full w-[9rem] h-[9rem] md:w-[16rem] md:h-[16rem] bg-secondary flex items-center justify-center' />
        </div>
        <div className='flex flex-col justify-center'>
            <h1 className='text-white text-[3rem] font-light'>{userDetails.userName}</h1>
            <h1 className='text-white text-[1.5rem]  font-light'>{userDetails.name}</h1>
            <h1 className='text-white  font-light'>Valorant Player <span className='text-main'>@UnknownEsports</span></h1>
            <h1 className='text-white text-[.7rem] font-light pt-3 text-center md:text-start'>Website</h1>
            <a href="#" className='bg-contrast text-main rounded-full text-center mt-1'>www.gfxbot.co.in</a>

            <button className='text-secondary bg-main rounded-md py-1 mt-3'>Following</button>
            
            
        </div>
        <div>

        </div>

      </div>
      <div className='md:px-[2rem]  ' >
<Profilepost userPost={userPosts} />
      </div>
    </div>
  )
}

export default Profile