import React, { useState } from 'react'
import {logo} from "../Assets/assets"
import {ChatBubbleLeftRightIcon,ArrowUpOnSquareIcon} from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { FileUploadContext } from '../Contexts/fFileUploadContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Dropdown from './dropDown';
import Search from './Search';

const Navbar = () => {
  const [dropdown,setDropdown] = useState(false)
  const [showSearch,setSearch] = useState(false)
  const [searchString,setSearchString]= useState('')
  
  const nav = useNavigate()
  const {fileUploa} = useContext(FileUploadContext)
  const [showModal,setShowModal]=fileUploa
  const ModalHandler=()=>{
    console.log(showModal);
    setShowModal(true)
  }
  return (
    <div className='containerDiv relative top-0 right-0 w-100 left-0 z-[9]'>
      {
        searchString =="" ?  null : <Search setSearchString={setSearchString} className="duration-300 ease-in-out"/>
      }
        <div className='h-[5rem] bg-secondary text-white px-3 sm:px-[8rem] flex justify-between items-center'>
         <div className=' '>
         <img onClick={()=>{
          nav('/home')
         }} src={logo} alt=""  className='cursor-pointer' width="250px"/>
         </div>
         <div>
          <input type="text" className='hidden sm:flex bg-contrast  rounded-sm text-main px-6 text-sm py-1 outline-none mx-3' value={searchString} onChange={(e)=>{
            console.log(searchString);
            setSearchString(e.target.value)
          }}  placeholder='Search Gamers' />

         </div>
         <div className='grid grid-cols-3 gap-1 sm:gap-6 text-main'>
         <ArrowUpOnSquareIcon className="h-7 mt-1 cursor-pointer"  onClick={ModalHandler} />
         <ChatBubbleLeftRightIcon className="h-7 mt-2 cursor-pointer" onClick={()=>{
        nav('/message')
         }} />
       <div className='h-[2.5rem] w-[2.5rem] border-2 border-main bg-secondary rounded-full  cursor-pointer' onClick={()=>{
        setDropdown(!dropdown)
       }}></div>
         </div>
        </div> 
    {
      dropdown && <Dropdown dropdown={dropdown} />
    } 
    </div>
  ) 
}

export default Navbar