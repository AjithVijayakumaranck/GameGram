import { BugAntIcon, ChartBarIcon, PhotoIcon, PowerIcon } from '@heroicons/react/24/outline'
import { ArrowDownRightIcon, ArrowLeftIcon, ArrowRightIcon, UsersIcon } from '@heroicons/react/24/solid'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logo, SmallLogo } from '../../Assets/assets'


const Sidebar = ({sideBarExpanded,setSidebarExpanded}) => {
    const Navigate = useNavigate()
  const [menu,setMenu]=useState([{
    name:"DashBoard",
    log:<ChartBarIcon className='w-5'/>
,
path:"/adminhome/dashboard"
  },
  {
    name:"Users",
    log:<UsersIcon className='w-5'/>
,
path:"/adminhome/Users"
  },
  {
    name:"Posts",
    log:<PhotoIcon className='w-5'/>,
path:"/adminhome/Posts"
  },
  {
    name:"Reports",
    log:<BugAntIcon className='w-5'/>
,
path:"/adminhome/Reports"
  },])
  return (
    <div className={`bg-dark  h-screen flex flex-col relative duration-300 ${sideBarExpanded ? 'w-[21rem]' : 'w-[5rem] '}`}>
        <ArrowLeftIcon className={`absolute right-[-8px] p-1 w-7  ${sideBarExpanded ? "top-8 bg-main text-dark" : "rotate-180 transform-gpu bottom-5  bg-[#b100fa] text-white"}`} onClick={()=>{setSidebarExpanded(!sideBarExpanded)}}/>
        <div className=' mt-5 flex justify-center'>
        <img src={sideBarExpanded ? logo : SmallLogo} alt="" className={sideBarExpanded  ? `w-[10rem]` : 'w-[10rem]'} />
        </div>
        <div className='pt-10'>
            {menu.map((eachMenuItem,index)=>{
                return(
                    <div className={` text-white ${sideBarExpanded ? `py-2 mb-3  text-center hover:bg-main hover:text-dark hover:rounded-tl-full ${window.location.pathname==eachMenuItem.path ? "bg-main rounded-tl-full text-dark" : null} `  : `flex justify-center py-2 mb-3 text-white text-center hover:bg-[#b100fa] hover:text-yellow-300 hover:rounded-md ${window.location.pathname==eachMenuItem.path ? "bg-admin rounded-md text-yellow-400" : null} `} `} onClick={()=>{
                        Navigate(eachMenuItem.path)
                    }}>
                        <p className='cursor-pointer'>{sideBarExpanded ? eachMenuItem.name : eachMenuItem?.log }</p>
                    </div>
                )
            })}
        </div>

    </div>
  )
}

export default Sidebar