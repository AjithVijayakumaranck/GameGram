import React from 'react'
import NavbarLogin from '../Components/NavbarLogin'
import Login from '../Components/login'
import './LoginSignUP.css'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'





const LoginPage = () => {
  const token = localStorage.getItem("token")

  const Nav = useNavigate()

  // useEffect(() => {
  //   if(token){
  //     console.log('token is here');
  //     Nav('/home')
  //   }else{
  //     Nav('/')
  //   }
  // }, []);


  return (
    <div className='h-[100vh]'>
      <div className='h-full' id="backDrop">
        <NavbarLogin className="fixed" loginVal={true} />
        <div className='sm:flex-row flex flex-col'>
          <div className='w-[45%]'>
          </div>
          <div className='w-full pt-[9rem]  '>
            <Login />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage