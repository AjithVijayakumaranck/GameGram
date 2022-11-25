import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Components/navbar'
import ProfileDetails from '../Components/ProfileDetails'
import Profilepost from '../Components/Profilepost'
import SinglePost from '../Components/singlePost'

const Profile = () => {
  let { id } = useParams()
  const [userDetails, setUserDetails] = useState({})
  const [userPosts, setuserPosts] = useState([])
  const [singleModal, setSingleModal] = useState(false)
  const [currentPost, setCurrentPost] = useState({})
  const [State, setState] = useState(false)

  const singlePostView = async (postId) => {
    console.log("hello Post");
    axios.get(`http://localhost:5000/getpost/${postId}`).then((response) => {
      console.log(response.data, "hello post");
      setCurrentPost({ ...response.data })
      setSingleModal(true)
    })
  }

  useEffect(() => {
    console.log(id, "hello google");
    const userId = id
    axios.get(`http://localhost:5000/getuserprofile/${userId}`).then((response) => {
      console.log(response.data);
      setUserDetails({ ...userDetails, ...response.data.response })
      setuserPosts([...response.data.convertedPost])
    }).catch((err) => {
      console.log(err);
    })
  }, [State])

  return (
    <div className='overflow-auto divScroll h-screen relative top-0 right-0'><div>
      <Navbar />
    </div>
      {
        singleModal && <SinglePost setSingleModal={setSingleModal} singlePostView={singlePostView} currentPost={currentPost} />
      }
      <ProfileDetails userDetails={userDetails} setState={setState} State={State} />
      <div className='md:px-[2rem]'>
        <Profilepost userPost={userPosts} setCurrentPost={setCurrentPost} singlePostView={singlePostView} />
      </div>
    </div>
  )
}

export default Profile