import React, { useEffect, useState, useContext, useRef } from 'react'
import Navbar from '../Components/navbar'
import Card from '../Components/card'
import { io } from 'socket.io-client'
import Stories from '../Components/stories'
import axios from 'axios'


import { Navigate, useNavigate } from 'react-router-dom'
import FileUpload from '../Components/FileUpload'
import { FileUploadContext } from '../Contexts/fFileUploadContext'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
const token = localStorage.getItem("token")
axios.defaults.headers.common['Authorization'] = token



const Home = () => {
  const [state, setState] = useState(false)
  const [Notification, setNotification] = useState(false)
  const nav = useNavigate()
  const [userId, setUserId] = useState('')
  const socket = useRef()
  const { fileUploa } = useContext(FileUploadContext)
  const [showModal, setShowModal] = fileUploa
  const [posts, setPost] = useState([])
  const [onlineFriends, setOnlineFriends] = useState([])
  const [user, setUser] = useState({})
  // const []

  useEffect(() => {
    // socket.current = io.connect("https://gamegram.ga/api")
    socket.current = io.connect("https://gamegram.ga/api", { path: "/socket/socket.io" });

    socket.current.emit("addUser", {
      userId: localStorage.getItem('user')
    })

    socket.current.emit("getAllUsers", {
      userId: localStorage.getItem('user')
    })

    socket.current.on("getusersAll", (data) => {
      console.log("INSIDE SOCKET.................");
      console.log(data.allUsers, "inside");

      data.allUsers.forEach(async (each) => {
        console.log(each, "each user");

        if (each.userId.userId === localStorage.getItem('user')) {
          console.log("you are the one only online")
        } else {
          console.log(each.userId.userId, "user id is diiff");

          axios.get(`https://gamegram.ga/api/getuserprofile/${each.userId.userId}`).then((response) => {
            console.log(response.data.response, "friedns online");
            setOnlineFriends([...onlineFriends, response.data.response])
          }
          )
        }
      });
    })


    axios.get(`https://gamegram.ga/api/getuserprofile/${localStorage.getItem('user')}`).then((response) => {
      console.log('response', response.data.response);
      setUser({ ...response.data.response })
    }).catch((error) => {

    })
    axios.get("https://gamegram.ga/api/recieveFile").then((response) => {
      console.log(response.data, "userData");
      setPost([...response.data.post])
    }).catch((error) => {

    })


    return () => {

    };
  }, [])




  return (
    <div className='relative top-0 right-0 left-0'>
      <Navbar className="" />

      <div className='absolute px-3 md:px-[7rem] pt-[5rem]  top-0 left-0 right-0  z-[1]'>
        {showModal && <FileUpload setPost={setPost} post={posts} userId={userId} className="absolute z-10" />}
        {/* <Stories /> */}
        <div className='flex gap-6 '>
          <div className='bg-secondary shadow-lg mt-5 w-[70rem] hidden md:flex flex-col items-center h-fit pb-3 px-6 pt-5 rounded-md'>
            <div className='w-[5rem] h-[5rem] rounded-full bg-dark border-2 mb-2 border-main'>

            </div>
            <p className='text-main  text-center'>{user.userName}</p>
            <p className='text-white text-xs'>{user.name}</p>
            <div>
              <div className="modalBody  text-white">


                <h5 className='font-medium text-white text-center'>{user.email}</h5>
                <div className='flex gap-5 pt-3 '>
                  <div>
                    <h5 className='font-medium text-white'>Followers</h5>
                    <h5 className='font-medium text-main text-center'>{user.followers?.length}</h5>
                  </div>
                  <div>
                    <h5 className='font-medium text-white'>Following</h5>
                    <h5 className='font-medium text-main text-center'>{user.following?.length}</h5>
                  </div>
                  <div>
                    <h5 className='font-medium text-white'>Posts</h5>
                    <h5 className='font-medium text-main text-center'>{user.post?.length}</h5>
                  </div>


                </div>

                <div className='flex justify-center pt-4'>
                  <button className='text-dark bg-main px-2 rounded-md py-1 ' onClick={() => {
                    nav(`/userprofile/${localStorage.getItem('user')}`)
                  }}>
                    Go to Profile
                  </button>
                </div>


                <hr className='mt-5 border-t-2 border-t-main' />




              </div>
            </div>
          </div>
          <div>
            <Card post={posts} setPost={setPost} />
          </div>
          <div className='bg-secondary mt-5 hidden md:block  h-fit pb-4 px-6 pt-2 rounded-md'>
            <p className='text-white py-2 w-[10rem] '>Friends Online</p>
            {
              onlineFriends.map((friend) => {
                console.log(friend, "friend");
                return (
                  <div className='flex items-center'>
                    <div className='w-[3rem] h-[3rem] rounded-full bg-dark border-2 border-main relative text-main'>
                      <div className=' absolute bottom-0 p-1 right-[-4px] overflow-hidden w-[1rem] h-[1rem]  rounded-full'>

                        <PlayCircleIcon className='bg-dark   animate-ping ' />
                      </div>
                    </div>
                    <div className=''>
                      <p className='text-white text-sm px-3'>{friend.name}</p>
                    </div>

                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}



export default Home