import React from 'react'
import NavbarLogin from '../Components/NavbarLogin'
import Login from '../Components/login'
import './LoginSignUP.css'

const LoginPage = () => {
  return (
    <div className='h-[100vh]'>
       <div className='h-full'  id="backDrop">
       <NavbarLogin className="fixed" loginVal={true}/>
        <div className='sm:flex-row flex flex-col'>
            <div className='w-[45%]'>
             
            </div>
            <div className='w-full pt-[9rem]  '>
                
           <Login/>
            </div>
        </div>
       </div>
    </div>
  )
}

export default LoginPage