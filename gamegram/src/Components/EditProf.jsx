import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EditProf = ({userDetails}) => {
    let {id} =  useParams()
    // const [currentUser,setCurrentUser]= useState(undefined)
    const [userDet,setUserDet]=useState({})

    useEffect(() => {
        console.log(id,"hello google");
        const userId = id
        axios.get(`http://localhost:5000/getuserprofile/${userId}`).then((response)=>{
          console.log(response.data,"edit data ");
          setUserDet({...userDet,...response.data.response}) 
        }).catch((err)=>{
          console.log(err);
        })
      }, [])

    return (
        <div className="header flex flex-col  items-center md:justify-center pt-2 gap-10 mt-[2rem]">
        <div className='rounded-full w-[8rem] h-[8rem] md:w-[13rem] md:h-[13rem] bg-dark flex items-center justify-center border-2 border-main'>
      
        </div>
        <div className='flex  flex-col justify-center'>
            <div className='grid grid-cols-3 gap-8 text-center'>
<div className='text-white '>
<p>Username</p>
                <input type="text" value={userDet.name} className='w-[20rem] text-main outline-none px-6 text-center py-1 bg-secondary rounded' />
</div>
<div className='text-white'>
<p>Display Name</p>
                <input type="text"  value={userDet.userName} className='w-[20rem] text-main outline-none px-6 text-center py-1 bg-secondary rounded' />
</div>
<div className='text-white'>
<p>Email</p>
                <input type="text" value={userDet.email} className='w-[20rem] text-main outline-none px-6 text-center py-1 bg-secondary rounded' />
</div>
<div className='text-white'>



            </div>
            <div className='text-white'>
            <p>Bio</p>
                <textarea value={userDet.bio} className='w-[20rem] text-main outline-none px-6 text-center py-1 bg-secondary rounded divScroll' maxLength={'50'} />
</div>
            </div>

            
        </div>
        <div>
    
        </div>
     
      </div>
      )
}

export default EditProf