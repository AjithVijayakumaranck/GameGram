import React from 'react'
import {logo} from "../Assets/assets"
import {ChatBubbleLeftRightIcon,ArrowUpOnSquareIcon} from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { FileUploadContext } from '../Contexts/fFileUploadContext';

const Navbar = () => {
  
  const {fileUploa} = useContext(FileUploadContext)
  const [showModal,setShowModal]=fileUploa
  const ModalHandler=()=>{
    console.log(showModal);
    setShowModal(true)
  }
  return (
    <div className='containerDiv fixed top-0 right-0 w-100 left-0 z-[9]'>
        <div className='h-[5rem] bg-secondary text-white px-3 sm:px-[8rem] flex justify-between'>
         <div className=' pt-5'>
         <img src={logo} alt="" width="250px"/>
         </div>
         <div>
          <input type="text" className='hidden sm:flex bg-contrast mt-6 rounded-sm text-main px-6 text-sm py-1 outline-none mx-3'  placeholder='Search Gamers' />

         </div>
         <div className='grid grid-cols-3 gap-1 sm:gap-6 text-main'>
         <ArrowUpOnSquareIcon className="h-7 mt-5 cursor-pointer"  onClick={ModalHandler} />
         <ChatBubbleLeftRightIcon className="h-7 mt-6"/>
         <div className='h-[3rem] w-[3rem] bg-main rounded-full mt-3 p-1'> <div className='h-[2.5rem] w-[2.5rem] bg-secondary rounded-full'></div></div>
         </div>
        </div> 
    </div>
  )
}

export default Navbar