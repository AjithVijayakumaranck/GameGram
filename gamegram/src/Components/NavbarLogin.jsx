import React from 'react'

const NavbarLogin = (props) => {
  return (
    <div className='text-white flex px-[10rem]  py-5 justify-between'>
     <div className='sm:w-1/2 w-full'>
    <h2 className='text-xl text-center sm:text-left font-bold p-0 m-0'>GAME<span className="text-main ">GRAM</span></h2>
     </div>
     <div className=' gap-10 hidden sm:flex'>
     {
      props.loginVal ? <h2 className='text-md font-medium'>SIGNUP</h2> : <h2 className='text-md font-medium'>LOGIN</h2>
     }
     <h2 className='text-md font-medium'>Explore <span className='text-main font-bold'>GAMEGRAM</span></h2>
     </div>
    </div>
  )
}

export default NavbarLogin