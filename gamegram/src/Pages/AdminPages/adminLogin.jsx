import React from 'react'

import './LoginSignUP.css'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import LoginAdmin from '../../Components/AdminComponents/LoginBox'


const token = localStorage.getItem("logged")



const LoginPage = () => {

  const Nav = useNavigate()

//   useEffect(() => {
//     if(token){
//       console.log('token is here');
//       Nav('/home')
//     }else{
//       Nav('/')
//     }
//   }, []);


  return (
    <div className='h-[100vh]'>
      <div className='h-full' id="backDrop">

        <div className='sm:flex-row flex flex-col'>
          <div className='w-[45%]'>
          </div>
          <div className='w-full pt-[9rem]  '>
        <LoginAdmin/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage