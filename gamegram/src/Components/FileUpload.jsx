import React, { useContext, useState } from "react";
import { FileUploadContext } from "../Contexts/fFileUploadContext";
import { FileUpContext } from "../Contexts/FileUploadContext";
import {PhotoIcon} from '@heroicons/react/24/solid'
import axios from "axios";
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

export default function FileUpload({post,setPost}) {
  const {fileUploa} = useContext(FileUploadContext)
  const{fileSave}=useContext(FileUpContext)
  const[file,setFile]=fileSave;
  const[error,setError]=useState(false);
  const [showModal,setShowModal]=fileUploa
  const [spinner,setSpinner]=useState(false)

  const token=localStorage.getItem("token")


  
 const ModalHandler =()=>{
  setShowModal(false)
  setFile({...file,   file:"",
  fileUrl:"",
  Caption:""})
   }

  const submitHandler=(e)=>{
    e.preventDefault()
    if(file.file==""){
    setError(true)
    }else{
    console.log(file);
    let data = new FormData();
    for (let key in file) {
        data.append(key, file[key]) 
    }
    data.append("userToken",token)
   
    setSpinner(true)
    axios.post("https://gamegram.ga/api/uploadfile",data,{
      headers: { 'Content-Type': 'multipart/form-data' }
       
  }).then(()=>{
  
     axios.get("https://gamegram.ga/api/recieveFile").then((response) => {
      console.log(response.data, "log is here ");
      setSpinner(false)
      ModalHandler()
      setShowModal(false)
      setPost([...response.data.post])
    })
     console.log("success");
    }).catch((error)=>{

    })
  }
  }





  const uploadFile = (event) => {

    console.log(event.target.files);
    console.log(URL.createObjectURL(event.target.files[0]));
    setFile({...file,fileUrl:URL.createObjectURL(event.target.files[0]),
    file:event.target.files[0]});
  
}
  return (
    <>
    
      {showModal ? (
        <>
          <div
            className="justify-center duration-300 items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="absolute   w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-secondary   outline-none focus:outline-none">
                {/*header*/}
              {
                spinner ? <div className="flex justify-center items-center  m-14">
                <div className="spinner-border animate-spin inline-block w-14 h-14 border-4 text-main rounded-full" role="status">
                  <span className="visually-hidden">Updating content</span>
                </div>
                  <p className="text-white px-2">updating Content</p>
              </div>: <div>
                <div className="flex items-start justify-between  p-5 border-b border-solid border-main rounded-t">
                   <h3 className="text-3xl font-medium text-main">
                    Post Upload
                   </h3>
                   <button
                     className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                     onClick={ModalHandler}
                   >
                     <span className="bg-transparent text-white  h-6 w-6 text-2xl font-medium block outline-none focus:outline-none">
                       ×
                     </span>
                   </button>
                 </div>
                 {/*body*/}
                 <div className="relative p-6 flex-auto">
                 <div className="md:max-w-[600px] max-h-[300px]  md:min-w-[500px] min-w-[300px] flex justify-center items-center">
                  {file.fileUrl!=""?
                  <img src={file.fileUrl}  alt="" className="max-w-[600px] max-h-[300px] text-white"/>:< PhotoIcon className="w-[250px] h-[250px] text-main"/>
                  }
                 </div>
 
                  <div className="flex justify-center border-dashed border-[2px] border-white items-center  rounded-sm h-[5rem] mt-1">
                   <label htmlFor="uploadFile" className=" cursor-pointer  rounded-sm text-white " >Browse File to upload</label>
                  <input type="file" id="uploadFile" onChange={uploadFile} className="hidden"   accept="image/png,image/jpeg"/>
                  </div>
                 </div>
     <div className="px-5 py-3 pt-1 text-center">
       <label htmlFor="caption" className="text-main ">Post Caption</label>
       <textarea className="text-white bg-contrast rounded  px-5 w-full outline-none pt-1 text-sm" name="" id="caption" value={file.Caption} onChange={(e)=>{
         setFile({...file,Caption:e.target.value})
       }} />
     </div>
                 {/*footer*/}
                 <div className="flex items-center justify-center p-6 border-t border-solid border-main rounded-b">
                   <button
                     className="bg-main text-secondary active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                     type="button"
                     onClick={submitHandler}
                   >
                     Publish Post
                   </button>
                 </div>
                   {
                     error && <h1 className="text-main text-center ">upload a media</h1>
                 
                   }
              
               </div>  
              }
               </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}