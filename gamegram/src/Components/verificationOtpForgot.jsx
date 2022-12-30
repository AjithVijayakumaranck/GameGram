import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Navigate, useNavigate, useParams } from 'react-router-dom'


axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
const VerificationOtpForgot = () => {
    const navigate = useNavigate()
    let {mailid} =  useParams()
    const [otp,setOtp] = useState(new Array(4).fill(""))

    const handlechange =(element,index)=>{
        console.log(mailid);
        if(isNaN(element.value))return false;
        setOtp([...otp.map((dt,idx)=>(idx===index ? element.value :dt))]);
        if(element.nextSibling){
            element.nextSibling.focus()
        }
    }

   const submitHandler=(e)=>{
   e.preventDefault()
   axios.post('https//gamegram.ga/api/verifyOtpforgot',{mailid,otp}).then((response)=>{
   console.log(response.data,"veridfication otp datas");
   navigate(`/resetpassword/${response.data._id}`)
   }).catch((error)=>{

   })
    }

    return (
        <div className='flex flex-col items-center h-screen justify-center w-full text-center bg-secondary'>
<div className="flex jusify-center flex-col  shadow-2xl px-[6rem]   py-[6rem] rounded-md  ">
<div className='text-white  '>
   <h2 className='text-2xl mb-3'>Enter your<span className='text-main'> OTP </span></h2>
   <h2 className='text-sm mb-3'>We have to know its<span className='text-main'> You </span></h2>
            </div>
            <div>
            <form action=" " className='flex gap-3 text-white '>
                {
                    otp.map((data,index)=>{

                        return(
                            <input type="tel" maxLength="1" key={index} onChange={(e)=>{
                                  handlechange(e.target,index)
                            }} value={data} className='text-4xl rounded-md outline-none w-[3.5rem] text-center h-[4rem] bg-contrast'/>
                        )
                    })
                }
        
            <br/>
        
         </form>

         <input type="submit" value='submit' onClick={submitHandler} className='text-main px-2 rounded-md py-1 mt-5 text-xl  bg-contrast hover:text-secondary hover:bg-main duration-500'  />
            </div>
</div>
     
        </div>
    )
}

export default VerificationOtpForgot