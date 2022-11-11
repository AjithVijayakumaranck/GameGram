import React from 'react'
import '../Pages/LoginSignUP.css'

const ForgotPassword = () => {
  return (
    <div className='text-white h-screen ' id="backDrop">
        <div className='grid grid-cols-3'>
           <div className='col-start-2'>
            <div>
            <label  className='text-white mb-2'>Email</label>

           <input type="text"  className='w-full bg-secondary rounded-md py-2 px-3 outline-none text-white'/>
            </div>
           </div>
        </div>
    </div>
  )
}

export default ForgotPassword