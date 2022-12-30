import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../Pages/LoginSignUP.css'
import 'tw-elements';

const ForgotPassword = () => {
  const nav = useNavigate()
  const [spinner,setSpinner]=useState(false)
  const [mail,setMail]=useState('')
  const checkAccount = () => {
    setSpinner(true)
    axios.get(`http://gamegram.ga/api/forgotaccount/${mail}`).then((response)=>{
      console.log(response.data.response.email);
      setSpinner(false)
      nav(`/verificationotpforgot/${response.data.response.email}`)

    })
  }
  return (

    <div className=' h-screen relative' id="backDrop">


      
        <div className='flex flex-col  gap-5 justify-center items-center h-screen'>
 {
  spinner ?        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4  text-main rounded-full" role="status">
  </div> : <div>
  <p className='text-2xl text-center text-white'>Forgot your password?</p>
            <div className='text-center flex flex-col'>
            <label  className='text-main mb-2 px-3'>Enter your email</label>
           <input type="email" value={mail} onChange={(e)=>{
            setMail(e.target.value)
           }}  className='w-[20rem] bg-secondary rounded-md py-2 px-3 outline-none text-white'/>
           <button className='bg-main cursor-pointer text-dark py-1 mt-4 rounded-md' onClick={checkAccount}>Find Account</button>
            </div>
  </div>
 }
    
       
        </div>
    </div>
  )
}

export default ForgotPassword