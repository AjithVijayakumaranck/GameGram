
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

const PostsAdmin = () => {
  const [sideBarExpanded,setCurrentUser,setShowModal] = useOutletContext() 
  const [users,setUsers] = useState([])
  const [render,setRender]= useState(true)

 const blockHandler = (userId) => {
  console.log();
      axios.post('http://gamegram.ga/api/admin/blockhandler',{userId}).then((response)=>{  
          setRender(!render)   
      })
 }
  let fetchCurrentUser = (userId) => {
      console.log("currentISer",userId);
      axios.get(`http://gamegram.ga/api/admin/getsingleuser/${userId}`).then((response)=>{
      setCurrentUser({...response.data})
      setShowModal(true)
      })
    }


  useEffect(()=>{
axios.get('http://gamegram.ga/api/admin/getusers').then((response)=>{
let {data} = response
setUsers([...data])
})
  },[blockHandler])

return (
  <div className='text-white'> <div className='hidden md:flex '>
      <table className="text-sm text-left w-full text-white dark:text-gray-400">
  <thead className={`text-xs  text-center uppercase ${sideBarExpanded ? 'bg-main text-dark' : "bg-admin text-white" }`}>
      <tr>
          <th scope="col" className="py-3 px-6">
             Display name
          </th>
          <th scope="col" className="py-3 px-6">
              User Name
          </th>
          <th scope="col" className="py-3 px-6">
              Email Address
          </th>
       
          <th scope="col" className="py-3 px-6">
              status
          </th>
          <th scope="col" className="py-3 px-6 ">
              actions
          </th> 
      </tr>
  </thead>
  <tbody className='text-center'>
 
  {
      users.map((user,index)=>{
         return(
          <tr key={index} className="bg-white border-b   dark:bg-gray-800 dark:border-gray-700">
          <td scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
             {user.name}
          </td>
          <td className="py-4 px-6 text-gray-900 font-medium">
          {user.userName}
          </td>
          <td  className="py-4 px-6 text-gray-900 font-medium">
           {user.email}
          </td>
      
          <td  className="py-4 px-6 text-gray-900 font-medium">
          <button className={` px-2 mr-2 rounded-md py-1 ${user.Blocked ? 'bg-red-600 text-dark before:content-["blocked"]' : "bg-main text-dark before:content-['block']" }`} onClick={()=>{
              blockHandler(user._id)
          }}></button>
          </td>
          <td  className="py-4 px-6 text-gray-900 font-medium">
              <div className='flex justify-center'>
               <button className={` px-2 mr-2 rounded-md py-1 ${sideBarExpanded ? 'bg-main text-dark' : "bg-admin text-white" }`} onClick={()=>{
                  console.log(user._id);
                  fetchCurrentUser(user._id)
               }}>View Details</button>
              </div>
          </td>
      </tr>
         )
      })
  }

     
  </tbody>
</table></div>
<div>
  
</div></div>
)
}

export default PostsAdmin