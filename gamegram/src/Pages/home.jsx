import React, { useEffect, useState } from 'react'
import Navbar from '../Components/navbar'
import Card from '../Components/card'
import Stories from '../Components/stories'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
const token =  localStorage.getItem("token")
axios.defaults.headers.common['Authorization']=token
const Home = () => {

  const [isAuth,setIsAuth]=useState(false);

  useEffect(() => {
   alert()
 },[])

 if( isAuth ){
    return (
    <div>
     <Navbar/>
   <div className=' px-3 md:px-[16rem]'>
   <Stories />
     <Card />
   </div>
    </div>
  )
    }
    return <Navigate to='/' />
}

export default Home