import React, { useState } from 'react'
import {logo} from "../Assets/assets"
import {ChatBubbleLeftRightIcon,ArrowUpOnSquareIcon, BellSnoozeIcon} from '@heroicons/react/24/outline'
import { useContext } from 'react';
import { FileUploadContext } from '../Contexts/fFileUploadContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Dropdown from './dropDown';
import Search from './Search';
import axios from 'axios';
import { UserProfileContext } from '../Contexts/userContext';
import Notification from './notficationBox';

const Navbar = () => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
  const [dropdown,setDropdown] = useState(false)
  const [showSearch,setSearch] = useState(false)
  const [notificationShow,setnotificationShow] = useState(false)
  const [searchString,setSearchString]= useState('')
  const [searchResult,setSearchResult] = useState([])

  const nav = useNavigate()
  const {Profile} = useContext(UserProfileContext)
  const [profUser,setprofUser] = Profile
  const {fileUploa} = useContext(FileUploadContext)
  const [showModal,setShowModal]=fileUploa
  const ModalHandler=()=>{
    console.log(showModal);
    setShowModal(true)
  }

  const changeHandlerSearch = (e) => {
    setSearchString(e.target.value)
    axios.get(`https://gamegram.ga/api/search/${searchString}`).then((Response)=>{
      console.log(...Response.data,"searchr ");
      setSearchResult([...Response.data])

    })
  }

  return (
    <div className='containerDiv relative top-0 right-0 w-100 left-0 z-[9]'>
      {
        searchString =="" ?  null : <Search setSearchString={setSearchString}  searchResult = {searchResult} className="duration-300 ease-in-out"/>
      }
      {
        notificationShow == "" ?  null : <Notification  className="duration-300 ease-in-out"/>
      }
        <div className='h-[5rem] bg-secondary text-white px-3 sm:px-[8rem] flex justify-between items-center'>
         <div className=' '>
         <img onClick={()=>{
          nav('/home')
         }} src={logo} alt=""  className='cursor-pointer' width="250px"/>
         </div>
         <div>
          <input type="text" className='hidden sm:flex bg-contrast  rounded-sm text-main px-6 text-sm py-1 outline-none mx-3' value={searchString} onChange={(e)=>{
          changeHandlerSearch(e)
          }}  placeholder='Search Gamers' />

         </div>
         <div className='flex gap-1 sm:gap-6 text-main'>
        <BellSnoozeIcon className="h-7 mt-2 cursor-pointer" onClick={()=>{
          setnotificationShow(!notificationShow)
        }}/>
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
      dropdown && <Dropdown dropdown={dropdown} user={profUser}/>
    } 
    </div>
  ) 
}

export default Navbar