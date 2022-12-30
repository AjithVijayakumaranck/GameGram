import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import FollowList from '../Components/FollowList'
import Navbar from '../Components/navbar'
import ProfileDetails from '../Components/ProfileDetails'
import Profilepost from '../Components/Profilepost'
import SinglePost from '../Components/singlePost'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const Profile = () => {
  let { id } = useParams()
  const [userDetails, setUserDetails] = useState({})
  const [userPosts, setuserPosts] = useState([])
  const [singleModal, setSingleModal] = useState(false)
  const [follow, setFollow] = useState(false)
  const [followers, setFollowers] = useState(false)
  const [currentPost, setCurrentPost] = useState({})
  const [State, setState] = useState(false)

  const singlePostView = async (postId) => {
    console.log("hello Post");
    axios.get(`https//gamegram.ga/api/getpost/${postId}`).then((response) => {
      console.log(response.data, "hello post");
      setCurrentPost({ ...response.data }) 
      setSingleModal(true)
    })
  }

  useEffect(() => {
    console.log(id, "hello google");
    const userId = id
    axios.get(`https//gamegram.ga/api/getuserprofile/${userId}`).then((response) => {
      console.log(response.data,'userPodfile');
      setUserDetails({ ...response.data.response })
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
    follow && <FollowList result = {userDetails.following} modelControl={setFollow}/>
   }
   {
    followers && <FollowList result = {userDetails.followers}  modelControl={setFollowers}/>
   }
      {
        singleModal && <SinglePost setSingleModal={setSingleModal} singlePostView={singlePostView} currentPost={currentPost} />
      }
      <ProfileDetails userDetails={userDetails} setState={setState} State={State} setFollow={setFollow} setFollowers = {setFollowers} />
      <div className='md:px-[2rem]'>
        <Profilepost userPost={userPosts} setCurrentPost={setCurrentPost} singlePostView={singlePostView} />
      </div>
    </div>
  )
}

export default Profile