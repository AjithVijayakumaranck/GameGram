import React from 'react'
import { useNavigate } from 'react-router-dom'

const FollowList = ({result,modelControl}) => {
  const PATH = process.env.REACT_APP_PUBLIC_FOLDER
  const nav = useNavigate()
  return (
    <div className='absolute text-white left-[40%] top-[30%] bg-secondary rounded px-3  py-2 min-w-[300px]' >
<div className='flex justify-end'>
<svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{
    modelControl(false)
}} fill="none"  viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" cursor-pointer w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</div>


        {
          result?.length==0 ?<p className='text-center text-main text-sm py-4'>You have no followers</p>:  result?.map((following)=>{
            return(
             <div className='flex py-2  my-1 rounded-lg px-2 items-center gap-3'>
               {/* <p>{result}</p> */}
               <div className='rounded-full border-main w-[3rem] h-[3rem] overflow-hidden border-2 '>
                   <img src={PATH + following.profilePic} alt="" />
               </div>
               <p className='text-main cursor-pointer' onClick={()=>{
                modelControl(false)
                nav(`/userprofile/${following._id}`)
               }}>{following.userName}</p>
             </div>
            )
       })
        }
    </div>
  )
}

export default FollowList