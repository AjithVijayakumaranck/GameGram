import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import EditProf from '../Components/EditProf'
import Navbar from '../Components/navbar'


const EditProfile = () => {
  let {id} =  useParams()
  const [userDetails,setUserDetails]= useState({})
  const [userPosts,setuserPosts]= useState([])
  const [file,setFile]=useState({  file:"",
  fileUrl:""})
  
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
    <EditProf userDetails={userDetails} setFile={setFile} file={file}/>
    </div>
  )
}

export default EditProfile