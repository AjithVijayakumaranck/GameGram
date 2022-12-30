import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'material-react-toastify';
import 'material-react-toastify/dist/ReactToastify.css';

import { ChatBubbleOvalLeftIcon, TrashIcon, } from '@heroicons/react/24/outline'
import { ChevronDownIcon, PaperAirplaneIcon, CheckIcon, HeartIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'
import mongoose from 'mongoose'
import { useContext } from 'react';
import { UserProfileContext } from '../Contexts/userContext';
const ObjectId = mongoose.Types.ObjectId
axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');


const Card = ({ post, setPost }) => {
  const { Profile } = useContext(UserProfileContext)
  const [profUser, setprofUser] = Profile
  console.log(post, "post is here");
  const [manageComment, setMannegeComment] = useState({ "": "" })
  const reciveFile = () => {
    axios.get("http://gamegram.ga/api/recieveFile").then((response) => {
      console.log(response.data, "logoo ");
      setPost([...response.data.post])
    })
  }
  const navigate = useNavigate()

  const toastSuccess = () => {
    toast.dark('Deleted Successfully', {
      position: "bottom-left",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const commentDelete = (commentId, postId) => {

    axios.post("http://gamegram.ga/api/deleteComment", { commentId, postId }).then((response) => {
      toastSuccess()
      reciveFile()
    })
  }

  const likeHandler = (postId, holderId,holder) => {
    console.log(holder,"hello holder");
    let usersDetails = {
      userId: localStorage.getItem('user'),
      receiverId:holder,
      type: "Like",
      postId: postId
    }
    axios.post(`http://gamegram.ga/api/handlelike/${postId}/${holderId}`).then(() => {
  
    axios.post("http://gamegram.ga/api/notification",usersDetails).then((res) => {
      reciveFile()
    }).catch((err) => {

    })
  
    })
  }

  const CommentlikeHandler = (commentId, userId) => {
    axios.post('http://gamegram.ga/api/commentlikehandle', { commentId, userId }).then((response) => {
      console.log(response.data);
      reciveFile()
    }).catch((error) => {
      console.log(error);
    })
    console.log(userId, commentId, "comment liked");
  }

  const commentChangeHandler = (event) => {
    console.log(manageComment, "hellos");
    // setMannegeComment({ ...manageComment, [event.target.name]: event.target.value })
    setMannegeComment({ [event.target.name]: event.target.value })
    console.log(manageComment, "helllo");
  }

  console.log(post);
  const [comment, setComment] = useState(false)
  return post.map((eachPost, index) => {
    const { post, Post, caption, holder, likes, _id, comments } = eachPost;
    const userId = localStorage.getItem('user')
    let like = likes.includes(userId);




    // index = index.toString()
    console.log(typeof (index))
    console.log(likes);
    const ext = Post.split('.')[1];


    const commentHandler = (e, postId, holderId, index) => {
      e.preventDefault()
      console.log('mini commobne');
      console.log(postId, holderId, index, "hello");
      console.log(Object.entries(manageComment), "hello meee");
      console.log(Object.entries(manageComment)[0], "single entry");
      let CurrentComment = Object.entries(manageComment)[0]

      axios.post('http://gamegram.ga/api/managecomment', { CurrentComment, index, postId, holderId: localStorage.getItem('user') }).then((response) => {
        console.log(
          "comment handler"
        );

        document.getElementById("inputFormTag").reset();
        reciveFile()
      }).catch((error) => {
        console.log(error);
      })
    }


    const profileHandler = (holderId) => {
      console.log(holderId._id);
      navigate(`/userprofile/${holderId._id}`)
    }


    return (
      <div className='cardWrapper pt-5'>
        <ToastContainer
          position="bottom-right"

          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className='grid grid-cols-4 rounded-xl gap-3 overflow-hidden '  >
          <div className='col-span-4 md:col-span-3 bg-transparent rounded-xl overflow-hidden'>
            <div id="imgWrapper" className='bg-contrast  rounded-xl mb-2 '>
              <img src={`data:image/${ext};base64, ${post}`} alt="Red dot" className='h-full w-full' />
            </div>
            {
              comment && <div className='bg-contrast rounded-xl col-span-4 px-4 py-2 flex  md:hidden flex-col justify-between mt-3 mb-3'>
                <div className='header text-white flex justify-between'>
                  <h4>Comments</h4>
                  <div className='flex gap-1'>
                    <ChevronDownIcon className='w-3 text-main' /><h6 className='text-[9px] my-auto'>Newest</h6>
                  </div>
                </div>
                <div id="commentBody " className='max-h-[15rem] overflow-y-auto divScroll'>
                  {
                    comments.map((eachComment, index) => {
                      const userId = localStorage.getItem('user')
                      return (
                        <div className=' flex items-center gap-3 pb-3' >
                          <div className='pb-1'>
                            <div className='w-[2rem] rounded-full border-main border-[1px] bg-secondary h-[2rem]' >
                         
                            </div>
                          </div>
                          <div className='w-full '><p className='text-white text-[10px]'><span className='text-main text-[15px] cursor-pointer' onClick={() => {
                            console.log(holder);
                            profileHandler(eachComment.Owner)
                          }}>{eachComment.Owner.userName}</span> {eachComment.comment}</p>

                            <p className='text-main text-[8px] '>{format(eachComment.createdAt)} <span onClick={() => {
                              commentDelete(eachComment._id, _id)
                            }} className='text-slate-300 cursor-pointer'>delete</span></p>
                          </div>
                          <div className='text-center flex'>

                            <div>
                              <HeartIcon className={`w-3 ${eachComment.likes.includes(userId) ? 'text-main' : 'text-secondary stroke-main '} cursor-pointer`} onClick={() => {
                                CommentlikeHandler(eachComment._id, userId)
                              }} /><p className='text-[7px] text-slate-300'>{eachComment.likes.length}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }


                </div>
                <div id="commentFooter " className='grid grid-cols-6 gap-2 mt-3'>
                  <input type="text" className='bg-secondary rounded-md text-white text-sm py-1 px-1 outline-none col-span-5 inline-flex' placeholder='Write a comment' onChange={commentChangeHandler} />
                  <button className='bg-main px-1 py-1 rounded-md flex justify-center' onClick={(e) => {
                    commentHandler(e, _id, holder._id, index)
                  }}>
                    {/* <PaperAirplaneIcon className='w-6'/>  */}
                    <p className='m-0 p-0 font-medium'>send</p>
                  </button>
                </div>
              </div>
            }

            <div id='cardMenus' className='flex justify-between'>

              {/* cardProfile */}
              <div className='flex items-center w-full'>

                <div>
                  <div className='h-[2.5rem] w-[2.5rem]  bg-secondary rounded-full border-2 overflow-hidden border-main '>
                  <img src={`http://gamegram.ga/api/images/postimages/${holder.profilePic}`} alt="" />
                  </div>
                </div>

                <div className='pl-2  mr-4'>
                  <h5 className='text-main p-[0px] m-[0px] leading-none' onClick={() => {
                    console.log(holder);
                    profileHandler(holder)
                  }}>{holder.name}</h5>
                </div>
                <div className='h-full pt-[.8rem] w-full rounded-lg mx-5 pl-3 bg-secondary'>
                  <h6 className='text-white  p-[0px] m-[0px] pt-[1.2px] text-sm leading-none'>{caption}</h6>
                  {/* <button className='bg-main text-secondary text-sm px-2 my-auto flex rounded-sm font-medium '> <CheckIcon className='w-4' /><p className='hidden xs:flex'> Following </p></button> */}
                </div>
              </div>
              <div className='flex gap-5 pr-2'>
                <div className='md:hidden text-center'>
                  <ChatBubbleOvalLeftIcon className='w-5 text-main' onClick={() => {
                    setComment(!comment)
                  }} />
                  <h5 className='text-white'>{comments.length}</h5>
                </div>
                <div className='text-center'>
                  <HeartIcon className={`w-5 ${likes.includes(userId) ? 'text-main' : 'text-secondary stroke-main '} cursor-pointer`} onClick={() => {
                    likeHandler(_id,userId,holder._id)
                  }} />
                  <h5 className='text-white'>{likes.length}</h5>
                </div>
              </div>
            </div>



          </div>
          <div className=' bg-contrast rounded-xl   px-4 py-2 hidden md:flex flex-col justify-between'>
            <div className='header text-white flex justify-between'>
              <h4>Comments</h4>
              <div className='flex gap-1'>
                <ChevronDownIcon className='w-3 text-main' /><h6 className='text-[9px] my-auto'>Newest</h6>
              </div>
            </div>
            <div id="commentBody" className=' pt-3 max-h-[18rem] overflow-y-auto divScroll'>
              {
                comments.map((eachComment, index) => {
                  const userId = localStorage.getItem('user')
                  return (
                    <div className=' flex items-center gap-3 pb-3' >
                      <div className='pb-1'>
                        <div className='w-[2rem] rounded-full border-main border-[1px] bg-secondary h-[2rem] overflow-hidden' >
                        <img src={`http://gamegram.ga/api/images/postimages/${eachComment.Owner.profilePic}`} alt="" />
                        </div>
                      </div>
                      <div className='w-full '><p className='text-white text-[10px]'><span className='text-main text-[15px] cursor-pointer' onClick={() => {
                        console.log(holder);
                        profileHandler(eachComment.Owner)
                      }}>{eachComment.Owner.userName}</span> {eachComment.comment}</p>

                  {
                    eachComment.Owner._id==userId &&       <p className='text-main text-[8px] '>{format(eachComment.createdAt)} <span onClick={() => {
                      commentDelete(eachComment._id, _id)
                    }} className='text-slate-300 cursor-pointer'>delete</span></p>
                  }
                      </div>
                      <div className='text-center flex'>

                        <div>
                          <HeartIcon className={`w-3 ${eachComment.likes.includes(userId) ? 'text-main' : 'text-secondary stroke-main '} cursor-pointer`} onClick={() => {
                            CommentlikeHandler(eachComment._id, userId)
                          }} /><p className='text-[7px] text-slate-300'>{eachComment.likes.length}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
            <form action="" id="inputFormTag">


              <div id="commentFooter " className='grid grid-cols-6 gap-2'>

                <input type="text" name={index} className='bg-secondary rounded-md text-white text-sm py-1 px-1 outline-none col-span-5 inline-flex' placeholder='Write a comment' onChange={commentChangeHandler} />

                <div >
                  <button className=' bg-main px-1 py-1 rounded-md flex' onClick={(e) => {
                    commentHandler(e, _id, holder._id, index)
                  }} >
                    <PaperAirplaneIcon className='w-6' />
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>

      </div>
    )
  })


}

export default Card