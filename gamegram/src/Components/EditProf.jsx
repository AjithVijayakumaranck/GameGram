import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import FileUpload from './FileUpload'

const EditProf = ({ userDetails,setFile,file}) => {
  let { id } = useParams()
  // const [currentUser,setCurrentUser]= useState(undefined)
  const [userDet, setUserDet] = useState({})





  useEffect(() => {
    console.log(id, "hello google");
    const userId = id
    axios.get(`http://localhost:5000/getuserprofile/${userId}`).then((response) => {
      console.log(response.data, "edit data ");
      setUserDet({ ...userDet, ...response.data.response })
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const saveChangesHandler = () => {
    
    console.log('have a nice day ', id);
    axios.post(`http://localhost:5000/updateuserprofile`, id).then((response) => {
      console.log(response.data, "edit data ");
      setUserDet({ ...userDet, ...response.data.response })
    }).catch((err) => {
      console.log(err);
    })
  }

  const uploadFile = (event) => {

    console.log(event.target.files);
    console.log(URL.createObjectURL(event.target.files[0]));
    setFile({...file,fileUrl:URL.createObjectURL(event.target.files[0]),
    file:event.target.files[0]});
  
}

  return (
    <div className="header flex flex-col md:flex-row pt-10 justify-evenly h-[550px]  items-center md:justify-center gap-10">
      <div>
        <div className='rounded-full w-[8rem] h-[8rem] md:w-[13rem] md:h-[13rem]  bg-dark relative top-0 right-0 flex items-center justify-center border-2 border-main'>
        
          <img src={file.fileUrl} alt=""  className='object-cover h-100 rounded-full'/>   
      
         <label htmlFor="profId"> <ArrowUpCircleIcon className='absolute w-10 text-white bottom-0 right-0  md:right-5 bg-dark rounded-full hover:text-main'/></label>
          <input type="file" id='profId' className='hidden' onChange={uploadFile} />
        </div>
      </div>
      <vr className="border-r-2 h-[23rem] border-main hidden md:flex"></vr>
      <div className='flex flex-col gap-8  h-full justify-center items-center px-5'>

    <div className='flex gap-2'>
    <div className='text-white text-center '>
          <p>Username</p>
          <input type="text" value={userDet.name} className='w-[20rem] md:w-[30rem]  text-main outline-none px-6 text-center py-2 bg-secondary rounded' />
        </div>
        <div className='text-white text-center '>
          <p>Username</p>
          <input type="text" value={userDet.userName} className='w-[20rem] md:w-[30rem]  text-main outline-none px-6 text-center py-2 bg-secondary rounded' />
        </div>
    </div>
    <div className='flex gap-2'>
    <div className='text-white text-center '>
          <p>Username</p>
          <input type="text" value={userDet.name} className='w-[20rem] md:w-[30rem]  text-main outline-none px-6 text-center py-2 bg-secondary rounded' />
        </div>
        <div className='text-white text-center '>
          <p>Username</p>
          <input type="text" value={userDet.userName} className='w-[20rem] md:w-[30rem]  text-main outline-none px-6 text-center py-2 bg-secondary rounded' />
        </div>
    </div>
    <div>
      <button className='px-3 bg-main rounded-sm'>
        submit
      </button>
    </div>
      
      </div>
      <div>

      </div>

    </div>
  )
}

export default EditProf