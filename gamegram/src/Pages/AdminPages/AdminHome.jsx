import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../Components/AdminComponents/Sidebar'
import Details from './detailModal'

const AdminHome = () => {
  const [sideBarExpanded,setSidebarExpanded] = useState(true)
  const [showModal,setShowModal] = useState(false)
  const [currentUser,setCurrentUser] = useState({})


  return (
    <div className='flex bg-white relative top-0 right-0'>
    {
      showModal ?   <Details currentUser={currentUser} setShowModal={setShowModal}/> : null
    }
    <div>
<Sidebar sideBarExpanded={sideBarExpanded} setSidebarExpanded={setSidebarExpanded}  />
    </div>
    <div className='w-full px-10 pt-10'>
   <Outlet context={[sideBarExpanded,setCurrentUser,setShowModal]} />
    </div>
</div>
  )
}

export default AdminHome