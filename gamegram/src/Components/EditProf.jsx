import { ArrowUpCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import FileUpload from './FileUpload'
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

const EditProf = ({ userDetails,setFile,file}) => {
  const PATH = process.env.REACT_APP_PUBLIC_FOLDER
  let nav = useNavigate()
  let { id } = useParams()
  // const [currentUser,setCurrentUser]= useState(undefined)
  const [userDet, setUserDet] = useState({})





  useEffect(() => {
    console.log(id, "hello google");
    const userId = id
    axios.get(`https://gamegram.ga/api/getuserprofile/${userId}`).then((response) => {
      console.log(response.data, "edit data ");
      setUserDet({ ...userDet, ...response.data.response })
      setFile({...file,
        file:PATH + response.data.response.profilePic,
        fileUrl:PATH + response.data.response.profilePic})
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  const saveChangesHandler = () => { 
    let data = new FormData();
    for (let key in file) {
      console.log(file[key],"keeeee");
        data.append(key,file[key]) 
    }
    for (let key in userDet) {
      console.log(key,"kuser det eeee");
        data.append(key,userDet[key]) 
    }

  
  
    axios.post(`https://gamegram.ga/api/updateuserprofile`,data,{
      headers: { 'Content-Type': 'multipart/form-data' }
  }).then((response) => {
nav(`/userprofile/${localStorage.getItem('user')}`)
    }).catch((err) => {
        console.log(err);
    })
  }

  const uploadFile = (event) => {

    console.log(event.target.files[0]);
    console.log(URL.createObjectURL(event.target.files[0]));
    setFile({...file,fileUrl:URL.createObjectURL(event.target.files[0],),
    file:event.target.files[0]});
    console.log(file,'helllo');
  
}

  return (
    <div className="header flex flex-col md:flex-row pt-10 justify-evenly h-[550px]  items-center md:justify-center gap-10">
      <div>
        <div className='rounded-full w-[8rem] h-[8rem] md:w-[13rem] md:h-[13rem]  bg-dark relative top-0 right-0 flex items-center justify-center border-2 border-main '>
        <div className='rounded-full w-[8rem] h-[8rem] md:w-[13rem] md:h-[13rem]  bg-dark relative top-0 right-0 flex items-center justify-center border-2 border-main overflow-hidden'>
          <img src={file.fileUrl} alt=""  className='object-cover h-100 rounded-full'/>   
          </div>
        
      
         <label htmlFor="profId"> <ArrowUpCircleIcon className='absolute w-10 text-white bottom-0 right-0  md:right-5 bg-dark rounded-full hover:text-main'/></label>
          <input type="file" id='profId' className='hidden'  onChange={uploadFile} />
        </div>
      </div>
      <vr className="border-r-2 h-[23rem] border-main hidden md:flex"></vr>
      <div className='flex flex-col gap-8  h-full justify-center items-center px-5'>

    <div className='flex gap-2'>
    <div className='text-white text-center '>
          <p>Username</p>
          <input type="text" value={userDet.name} onChange={(event)=>{
            setUserDet({
              ...userDet,name:event.target.value
            })
          }} className='w-[20rem] md:w-[30rem]  text-main outline-none px-6 text-center py-2 bg-secondary rounded' />
        </div>
        <div className='text-white text-center '>
          <p>Username</p>
          <input type="text"  value={userDet.userName} onChange={(event)=>{
            setUserDet({
              ...userDet,userName:event.target.value
            })
          }} className='w-[20rem] md:w-[30rem]  text-main outline-none px-6 text-center py-2 bg-secondary rounded' />
        </div>
    </div>
    <div className='flex gap-2'>
    <div className='text-white text-center '>
          <p>Username</p>
          <input type="date" onChange={(event)=>{
            setUserDet({
              ...userDet,dateOfBirth:event.target.value
            })
          }}  value={userDet.dateOfBirth} className='w-[20rem] md:w-[30rem]  text-main outline-none px-6 text-center py-2 bg-secondary rounded' />
        </div>
    
    </div>
    <div>
      <button onClick={saveChangesHandler} className='px-3 bg-main rounded-sm'>
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