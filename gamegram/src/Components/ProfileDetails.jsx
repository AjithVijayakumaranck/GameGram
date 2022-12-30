import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


const ProfileDetails = ({ userDetails, setState, State,setFollow,setFollowers}) => {
  const Navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(undefined)

  console.log(userDetails, "user is here");
  // const {following} = userDetails
  // console.log(following,"h000");

  // const userSetter = async () => {
  //     const Cuser = await 
  //     setCurrentUser(localStorage.getItem("user"))  
  // }

  const handleMessageButton = (user, currentUser) => {
    console.log(user, currentUser);
    axios.post("https://gamegram.ga/api/createconversation", { senderId: currentUser, recieverId: user }).then(() => {
      Navigate('/message')
    })
  }

  const followHandler = (user, currentUser) => {

    let usersDetails = {
      userId: currentUser,
      receiverId: user,
      type: "follow",
      postId: null
    }

    axios.post("https://gamegram.ga/api/followhandler", {
      headers: {
        'Authorization': localStorage.getItem('user')
      }, user, currentUser
    }).then((response) => {

      axios.post("https://gamegram.ga/api/notification", usersDetails).then((res) => {
        setState(!State)
      }).catch((err) => {

      })
      
    }
    )
  }

  useEffect(() => {

    setCurrentUser(localStorage.getItem("user"))


  }, [])


  return (
    <div className="header flex flex-col md:flex-row items-center md:justify-center pt-2 gap-10 mt-[2rem]">
      <div className='rounded-full w-[8rem] h-[8rem] md:w-[10rem] md:h-[10rem] bg-secondary border-2 overflow-hidden border-main flex items-center justify-center'>
        <img src={`https://gamegram.ga/api/images/postimages/${userDetails.profilePic}`} alt="" />

      </div>
      <div className='flex flex-col justify-center'>
        <h1 className='text-white text-[2rem] font-light'>{userDetails.userName}</h1>
        <h1 className='text-white text-[1rem]  font-light'>{userDetails.name}</h1>
        <div className='flex gap-5 py-1'>
          <h1 className='text-white text-[1rem]  font-light' onClick={()=>{
            setFollow(false)
            setFollowers(true)
          }}>{userDetails?.followers?.length} Followers</h1>
          <h1 className='text-white text-[1rem]  font-light' onClick={()=>{
            setFollowers(false)
            setFollow(true)
          }}>{userDetails?.following?.length} Following</h1>
          <h1 className='text-white text-[1rem]  font-light'>{userDetails?.post?.length} Post</h1>
        </div>
        <h1 className='text-white  font-light'>Valorant Player <span className='text-main'>@UnknownEsports</span></h1>
        <h1 className='text-white text-[.7rem] font-light pt-3 text-center md:text-start'>Website</h1>
        <a href="#" className='bg-contrast text-main rounded-full text-center mt-1'>www.gfxbot.co.in</a>
        {
          currentUser === userDetails._id ? null : <button className={`rounded-md ${userDetails?.followers?.includes(currentUser) ? 'bg-main text-dark mt-2 before:content-["following"] duration-300 hover:bg-red-600 hover:before:content-["unfollow"]' : 'bg-contrast text-white mt-2 before:content-["follow"] hover:bg-main hover:text-dark hover:before:content-["follow"]'} `} onClick={() => {
            followHandler(userDetails._id, currentUser)
          }}>

            {/* {userDetails?.followers?.includes(currentUser) ? 'following' : "follow"} */}
          </button>

        }
        {
          currentUser === userDetails._id ? null : <button className='rounded-md bg-main text-dark  mt-2 ' onClick={() => {
            handleMessageButton(userDetails._id, currentUser)
          }}>Message</button>

        }



      </div>
      <div>

      </div>

    </div>
  )
}

export default ProfileDetails