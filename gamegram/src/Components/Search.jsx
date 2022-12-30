import React from 'react'
import { useNavigate } from 'react-router-dom'

const Search = ({setSearchString,searchResult}) => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-center  '>
        <div className='ml-[5rem] absolute  top-[60px] min-w-[15rem] flex flex-col bg-dark py-3 text-dark rounded'>
     {
        searchResult.length==0?<p className='text-main text-center '>no user found</p>:
      searchResult.map((result)=>{
       return(
        <div className='flex px-2 items-center'>
          <div className='w-8 h-8 bg-main rounded-full'>
          </div>
          <p className='text-white pl-3 cursor-pointer' onClick={()=>{
navigate(`/userprofile/${result._id}`)
          }}>{result.name}</p>
        </div>
       )
      })
     }
         </div>
    </div>
  )
}

export default Search