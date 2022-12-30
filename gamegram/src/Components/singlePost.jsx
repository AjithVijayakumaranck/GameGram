import { HeartIcon, LockClosedIcon, XMarkIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'


import { format } from 'timeago.js'

axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
const SinglePost = ({ setSingleModal, currentPost, singlePostView }) => {

  const userId = localStorage.getItem('user')

  const navigate = useNavigate()

  const profileHandler = (holderId) => {
    setSingleModal(false)
    console.log(holderId._id);
    navigate(`/userprofile/${holderId._id}`)
  }


  const likeHandler = async (postId) => {
    let holderId = await localStorage.getItem('user')
    console.log(postId, holderId, "post like from prof");
    axios.post(`https//gamegram.ga/api/handlelike/${postId}/${holderId}`).then(() => {
      console.log("code is here");
      singlePostView(postId)
    })
  }


  const CommentlikeHandler = (commentId, userId, postId) => {

    console.log(userId);
    axios.post('https//gamegram.ga/api/commentlikehandle', { commentId, userId }).then((response) => {
      console.log(response.data);
      singlePostView(postId)
    }).catch((error) => {
      console.log(error);
    })
    console.log(userId, commentId, "comment liked");
  }



  return (
    <div className='text-white absolute flex justify-center items-center bottom-0 top-0 right-0  left-0 duration-1000 backdrop-blur-sm duration h-screen w-screen z-10'>
      <div className='text-white w-[60rem] bg-secondary h-[30rem] flex shadow-xl'>
        <div className='w-1/2 '>
          <div className='w-full h-full flex justify-center items-center overflow-hidden '>
            <img src={`https//gamegram.ga/api/images/postimages/${currentPost.Post}`} className='w-auto py-5' alt="Free unsplash image" />
          </div>
        </div>
        <div className='w-1/2 bg-dark flex flex-col justify-between px-5 py-3'>
          <div className='flex justify-between h-[3rem] ' >
            <p className='text-main' onClick={() => {
              console.log(currentPost.comments, "post Comment");
            }}>Comments</p>
            <XMarkIcon className='w-5 hover:text-main  cursor-pointer ' onClick={() => {
              setSingleModal(false)
            }} />
          </div>
          <div className='h-full pt-5 pl-6 '>
            {
              currentPost.comments?.map((eachComment) => {
                const userId = localStorage.getItem('user')
                return (
                  <div className=' flex items-center gap-3 pb-4  ' >
                    <div className='pb-1'>
                      <div className='w-[2rem] rounded-full border-main border-[1px] bg-secondary h-[2rem]' ></div>
                    </div>
                    <div className='w-full '><p className='text-white text-[10px]'><span className='text-main text-[15px] cursor-pointer' onClick={() => {
                      profileHandler(eachComment.Owner)
                    }}>{eachComment.Owner.userName}</span> {eachComment.comment}</p>

                      <p className='text-main text-[8px] '>{format(eachComment.createdAt)}</p>
                    </div>
                    <div className='text-center flex'>

                      <div>
                        <HeartIcon className={`w-3 ${eachComment.likes.includes(userId) ? 'text-main' : 'text-white'} cursor-pointer`} onClick={() => {
                          console.log(eachComment.likes.includes(userId), "hello like");
                          CommentlikeHandler(eachComment._id, userId, currentPost._id)
                        }} /><p className='text-[7px] text-slate-300'>{eachComment.likes.length}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>
          <div className='h-[3rem] flex flex-col '>
            <div className=' flex items-center'>
              <HeartIcon className={`w-5 ${currentPost.likes?.includes(userId) ? 'text-main' : 'text-white'} cursor-pointer`} onClick={() => {
                likeHandler(currentPost._id, userId)
              }} /> <p className='text-[10px] pl-1'>{currentPost.likes?.length}</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePost