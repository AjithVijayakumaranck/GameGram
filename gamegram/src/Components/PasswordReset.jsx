import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import '../Pages/LoginSignUP.css'
import 'tw-elements';

const PasswordReset = () => {
  const {userId} = useParams()
  console.log(userId,"param id");
  const nav = useNavigate()
  const [spinner,setSpinner]=useState(false)
  const [mail,setMail]=useState('')
  const checkAccount = () => {
    setSpinner(true)
    axios.post(`https://gamegram.ga/api/resetPassword`,{password:mail,userId}).then((response)=>{
      console.log("hell o gooel im here");
      setSpinner(false)
      nav(`/`)

    })
  }
  return (

    <div className=' h-screen relative' id="backDrop">


      
        <div className='flex flex-col  gap-5 justify-center items-center h-screen'>
 {
  spinner ?        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4  text-main rounded-full" role="status">
  </div> : <div>
  <p className='text-2xl text-center text-white'>We got you :)</p>
            <div className='text-center flex flex-col'>
            <label  className='text-main mb-2 px-3'>Enter your new password</label>
           <input type="text" value={mail} onChange={(e)=>{
            setMail(e.target.value)
           }}  className='w-[20rem] bg-secondary rounded-md py-2 px-3 outline-none text-white'/>
           <button className='bg-main cursor-pointer text-dark py-1 mt-4 rounded-md' onClick={checkAccount}>Reset</button>
            </div>
  </div>
 }
    
       
        </div>
    </div>
  )
}

export default PasswordReset