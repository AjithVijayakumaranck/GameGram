import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';


const Signup = () => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  const  navigate=useNavigate()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [signup, setSignUp] = useState({

        firstName: "",
        userName: "",
        email: "",
        dateOfBirth: "",
        password: "",

    })

    const onChangeHandler = (e) => {
        setSignUp({ ...signup, [e.target.name]: e.target.value })
    }

    const signupHandler = (e) => {
        // e.preventDefault()
        axios.post('https//gamegram.ga/api/signup', signup).then((Response) => {
            console.log(Response,"response is here");
            navigate(`/verificationotp/${signup.email}`)
        })
    }


    return (
        <div className='relative z-[10]'>
            <div className='z-10 py-5'>
                <div className='px-10 '>
                    <div id="formHeader" className='text-main font-semibold text-center sm:text-left  mb-5 ' >
                        <h2 className='text-xl'>
                            BE A GAME <span className="text-white">CHANGER</span>
                        </h2>
                    </div>
                    <form action="" onSubmit={handleSubmit(signupHandler)}>
                        <div className='grid grid-cols-2 gap-3 mb-5'>
                            <div className='flex flex-col col-span-2 sm:col-span-1'>
                                <label htmlFor="Firstname" className='text-white mb-2 sm:mb-5'>First name</label>
                                <input type="text" id='Firstname' name='firstName' value={signup.firstName}  {...register("firstName", { required: true, maxLength: 10 })} onChange={onChangeHandler} className='bg-secondary rounded-md py-2 px-3 outline-none text-white' placeholder='FirstName' />
                                {errors.firstName?.type === 'required' && <span className='text-main mb-0 pb-0 mt-1'>This field is required</span>}
                                {errors.firstName?.type === 'maxLength' && <span className='text-main mb-0 pb-0 mt-1'>Max length is 20 Characters</span>}
                            </div>
                            <div className='flex flex-col col-span-2 sm:col-span-1'>
                                <label htmlFor="Username" className='text-white mb-2 sm:mb-5'>User name</label>
                                <input type="text" name="userName" value={signup.userName} {...register("userName", { required: true, maxLength: 10 })} onChange={onChangeHandler} className='bg-secondary rounded-md py-2 px-3 outline-none text-white' id='Username' placeholder='UserName' />
                                {errors.userName?.type === 'required' && <span className='text-main mb-0 pb-0 mt-1'>This field is required</span>}
                                {errors.userName?.type === 'maxLength' && <span className='text-main mb-0 pb-0 mt-1'>Max length is 20 Characters</span>}
                            </div>
                        </div>
                        <div className='flex flex-col mb-5'>
                            <label htmlFor="email" className='text-white mb-2'>Email</label>
                            <input type="email" id='email' name='email' value={signup.email} {...register("email", { required: true,pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i })} onChange={onChangeHandler}  className='bg-secondary rounded-md py-2 px-3 outline-none text-white' placeholder='email' />
                            {errors.email?.type === 'required' && <span className='text-main mb-0 pb-0 mt-1'>This field is required</span>}
                            {errors.email?.type === 'pattern' && <span className='text-main mb-0 pb-0 mt-1'>wrong email format</span>}
                        </div>
                        <div className='flex flex-col mb-5'>
                            <label htmlFor="Date" className='text-white mb-2'>Date Of Birth</label>
                            <input type="date" id='Date' name='dateOfBirth' value={signup.dateOfBirth}   {...register("dateOfBirth", { required: true })} onChange={onChangeHandler} className='bg-secondary rounded-md py-2 px-3 outline-none text-white' placeholder='' />
                            {errors.dateOfBirth?.type === 'required' && <span className='text-main mb-0 pb-0 mt-1'>This field is required</span>}                        
                        </div>
                        <div className='flex flex-col mb-5'>
                            <label htmlFor="Password" className='text-white mb-2'>Password</label>
                            <input type="password" id='Password' name='password' value={signup.password} {...register("password", { required: true ,minLength:8,maxLength:20})} onChange={onChangeHandler} className='bg-secondary rounded-md py-2 px-3 outline-none text-white' placeholder='password' />
                            {errors.password?.type === 'required' && <span className='text-main mb-0 pb-0 mt-1'>This field is required</span>}  
                            {errors.password?.type === 'minLength' && <span className='text-main mb-0 pb-0 mt-1'>Password must have min 8 characters</span>}  
                            {errors.password?.type === 'maxLength' && <span className='text-main mb-0 pb-0 mt-1'>Not more than 20 characters</span>}  
                        </div>
                        <div className='text-center sm:text-left'>
                            <input type='submit' className='bg-main px-2 py-1 rounded-sm ' value="signup" />
                            <p className='text-white pt-2 text-sm'>already have account? <span className='text-main cursor-pointer' onClick={()=>{
                                navigate('/')
                            }}>Login</span></p>
                        </div>
                    </form>
                </div>
            </div>
            <div className='absolute top-0 left-0 w-full bg-secondary  opacity-30 h-full z-[-1]'>

            </div>
        </div>
    )
}

export default Signup