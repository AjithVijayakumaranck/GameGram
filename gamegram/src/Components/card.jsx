import React from 'react'
import {ChatBubbleOvalLeftIcon,} from '@heroicons/react/24/outline'
import { ChevronDownIcon,PaperAirplaneIcon,CheckIcon, HeartIcon} from '@heroicons/react/24/solid'
import { useState } from 'react'

const Card = () => {

  const [comment,setComment]= useState(false)
  return (
<div className='cardWrapper pt-5'>
<div className='grid grid-cols-4    rounded-xl gap-3 overflow-hidden '  >
        <div className='col-span-4 md:col-span-3 bg-transparent rounded-xl overflow-hidden'>
        <div id="imgWrapper" className='bg-contrast h-[21rem] rounded-xl mb-2'>
        </div>
        {
  comment &&    <div className= 'bg-contrast rounded-xl col-span-4 px-4 py-2 flex  md:hidden flex-col justify-between mt-3 mb-3'>
  <div className='header text-white flex justify-between'>
  <h4>Comments</h4>
<div className='flex gap-1'>
<ChevronDownIcon className='w-3 text-main'/><h6 className='text-[9px] my-auto'>Newest</h6>
  </div>
  </div>
  <div id="commentBody " className='max-h-[15rem] overflow-y-scroll'>
  <h2 className='text-white text-sm '>hello motto</h2>
  

  </div>
  <div id="commentFooter " className='grid grid-cols-6 gap-2 mt-3'>
     <input type="text" className='bg-secondary rounded-md text-white text-sm py-1 px-1 outline-none col-span-5 inline-flex' placeholder='Write a comment' />
   <button   className='bg-main px-1 py-1 rounded-md flex justify-center'>
   {/* <PaperAirplaneIcon className='w-6'/>  */}
   <p className='m-0 p-0 font-medium'>send</p>
   </button>
  </div>
</div>
 }
  
         <div id='cardMenus' className='flex justify-between'>
          
          {/* cardProfile */}
  <div className='flex'>
  <div className='h-[3rem] w-[3rem] bg-main rounded-l-3xl rounded-br-3xl py-1 px-1' >
         <div className='h-[2.5rem] w-[2.5rem] bg-secondary rounded-l-3xl rounded-br-3xl '></div>
         </div>
        <div className='pl-2 pt-2 mr-4'>
          <h5 className='text-main p-[0px] m-[0px] leading-none'>Profile Name</h5>
          <h6 className='text-white  p-[0px] m-[0px] pt-[1.2px] text-sm leading-none'>Post Caption is here</h6>
        </div>
         <div className='h-full pt-3'>
         <button className='bg-main text-secondary text-sm px-2 my-auto flex rounded-sm font-medium '> <CheckIcon className='w-4'/><p className='hidden xs:flex'> Following </p></button>
         </div>
         </div>
         <div className='flex gap-5 pr-2'>
        <div className='md:hidden'>
        <ChatBubbleOvalLeftIcon className='w-5 text-main' onClick={()=>{
          setComment(!comment)
        }}/>
          <h5 className='text-white'>1.3k</h5>
        </div>
        <div>
        <HeartIcon  className='w-5 text-main '/>
          <h5 className='text-white'>1.3k</h5>
        </div>
         </div>
  </div>

   

        </div>
         <div className= 'bg-contrast rounded-xl px-4 py-2 hidden md:flex flex-col justify-between'>
          <div className='header text-white flex justify-between'>
          <h4>Comments</h4>
        <div className='flex gap-1'>
        <ChevronDownIcon className='w-3 text-main'/><h6 className='text-[9px] my-auto'>Newest</h6>
          </div>
          </div>
          <div id="commentBody">

          </div>
          <div id="commentFooter " className='grid grid-cols-6 gap-2'>
             <input type="text" className='bg-secondary rounded-md text-white text-sm py-1 px-1 outline-none col-span-5 inline-flex' placeholder='Write a comment' />
             <button   className=' bg-main px-1 py-1 rounded-md flex'>
   <PaperAirplaneIcon className='w-6'/>
   </button>
          </div>
        </div>
        
        {/* mobile comment section */}

       


    </div>
   
</div>
  )
}

export default Card