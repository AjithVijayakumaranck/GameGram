import React, { useContext } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserProfileContext } from '../Contexts/userContext'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


const Login = () => {
    const {Profile} = useContext(UserProfileContext)
    const [profUser,setprofUser] = Profile
    const [invalidUser,setInvaliduser]=useState(false)
    const navigate=useNavigate()
    const [login,setLogin]= useState({
        userName:"",
        password:""
    })

    const onChangeHandler = (e)=>{
         setLogin({...login,[e.target.name]:e.target.value})
    }

   const loginHandler = (e)=>{
    e.preventDefault()
    console.log("boom");
    axios.post('http://gamegram.ga/api/login',login).then((Response)=>{
        console.log("response is here",Response);
       if (Response.data.status){
        const { token,user } = Response.data
        console.log(user._id,"hoooo");
        localStorage.setItem( "token" , "Bearer " + token);
        localStorage.setItem('logged',true)
        localStorage.setItem('user',user._id)
        setprofUser(user._id)
         navigate('/home')
       }else{
         setInvaliduser(true)
           setLogin({...login,userName:"",password:""})
       }
       })
   }


    return (
        <div className='relative z-[10]'>
            <div className='z-10 py-5'>
                <div className='px-5 '>
                    <div id="formHeader" className='text-main font-semibold text-center sm:text-left  mb-5 ' >
                  <h2 className='text-xl'>
                 BE A GAME <span className="text-white">CHANGER</span>
                  </h2>
                    </div>
                    <form action="" onSubmit={loginHandler}>
                    <div className='grid grid-cols-2 gap-3 mb-5'>
                        <div className='flex flex-col col-span-2 sm:col-span-2'>
                            <label htmlFor="Firstname" className='text-white mb-2 sm:mb-5'>First name</label>
                            <input type="text" id='Firstname' name="userName" onChange={onChangeHandler} className='bg-secondary rounded-md py-2 px-3 outline-none text-white' placeholder='FirstName' value={login.userName} required />
                        </div>
                  
                    </div>
                  
                
                    <div className='flex flex-col mb-5'>
                        <label htmlFor="Password" className='text-white mb-2'>Password</label>
                        <input type="password" id='Password' name="password" onChange={onChangeHandler} className='bg-secondary rounded-md py-2 px-3 outline-none text-white' placeholder='password' value={login.password} required/>
                        <p className='text-white pt-2 text-sm'>Forgot <span className='text-main cursor-pointer' onClick={()=>{
                            navigate('/forgotPassword')
                        }}>Password ?</span></p>
                    </div>
                    <div className='text-center sm:text-left'>
                        <input type="submit" className='bg-main px-2 py-1 rounded-sm '/><span className='text-main text-xs pl-5'>{invalidUser&& "Mail id or Password is wrong"}</span>
                        <p className='text-white pt-2 text-sm'>wanna be a member? <span className='text-main cursor-pointer' onClick={()=>{
                            navigate('/createaccount')
                        }}>signup</span></p>
                      
                    </div>
            </form>
                </div>
            </div>
            <div className='absolute top-0 left-0 w-full bg-secondary  opacity-30 h-full z-[-1]'>
                
            </div>
        </div>
    )
}

export default Login