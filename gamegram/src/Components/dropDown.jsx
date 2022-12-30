import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'


const Dropdown = (dropdown) => {
    const user = localStorage.getItem('user')
    const menuArray = [
        {
         menuTitle:"Profile",
         path:`/userprofile/${user}`
        },
        {
         menuTitle:"EditProfile",
         path:`/editprofile/${user}`
        }
    ]
    console.log(dropdown);
    const navigate = useNavigate()
  return (
   
    dropdown && <div className='relative top-0 left-0 '>
          {
        <div className='absolute top-[-10px] right-[10px] sm:right-[95px] bg-dark rounded text-white flex flex-col'>
        {
            menuArray.map((menu,index)=>{
                return(
                    <div key={index} className="px-4 hover:text-main duration-300">
                        <p className='text-left py-1 cursor-pointer' onClick={()=>{
                            navigate(menu.path)
                        }}>{menu.menuTitle}</p>
                    </div>
                )
            })
        }
        <div  className="px-4 hover:text-main duration-300">
                        <p className='text-left py-1 cursor-pointer' onClick={()=>{
                            localStorage.clear()
                                navigate('/')
                           
                        }}>Logout</p>
                    </div>
        
            </div>
      }
    
    </div>
  )
}

export default Dropdown