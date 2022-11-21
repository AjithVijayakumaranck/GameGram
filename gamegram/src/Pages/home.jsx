import React, { useEffect, useState, useContext } from 'react'
import Navbar from '../Components/navbar'
import Card from '../Components/card'
import Stories from '../Components/stories'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import FileUpload from '../Components/FileUpload'
import { FileUploadContext } from '../Contexts/fFileUploadContext'
const token = localStorage.getItem("token")
axios.defaults.headers.common['Authorization'] = token



const Home = () => {
  const [userId,setUserId]=useState('')
  const { fileUploa } = useContext(FileUploadContext)
  const [showModal, setShowModal] = fileUploa
  const [posts,setPost]=useState([])


  useEffect(() => {
   
    axios.get("http://localhost:5000/recieveFile").then((response)=>{
      console.log(response.data,"userData");
      setPost([...response.data.post])
    }).catch((error)=>{

    })
  }, [])




  return (
    <div className='relative top-0 right-0 left-0'>
      <Navbar className=""/>
     
      <div className='absolute px-3 md:px-[16rem] pt-[5rem]  top-0 left-0 right-0  z-[1]'>
        {showModal && <FileUpload setPost={setPost} post={posts} userId={userId} className="absolute z-10"/>}
        <Stories />
        <Card post={posts} setPost={setPost}/>
      </div>
    </div>
  )
}



export default Home