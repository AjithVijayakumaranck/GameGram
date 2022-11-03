import React, { useEffect } from 'react'
import { Navigate,useNavigate } from 'react-router-dom'
import NavbarLogin from '../Components/NavbarLogin'
import Signup from '../Components/signUp'
import './LoginSignUP.css'

const LoginSignup = () => {
   const Nav = useNavigate()
  const token = localStorage.getItem("logged")

  useEffect(() => {
    if(token){
      console.log('token is here');
      Nav('/home')
    }else{
      Nav('/createaccount')
    }
  }, []);
  return (
    <div className='h-[100vh]'>
       <div className='h-full'  id="backDrop">
       <NavbarLogin className="fixed"/>
        <div className='sm:flex-row flex flex-col'>
            <div className='w-[45%]'>
             
            </div>
            <div className='w-full pt-6 '>
            <Signup/>
            </div>
        </div>
       </div>
    </div>
  )
}

export default LoginSignup