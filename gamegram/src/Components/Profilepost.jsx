import React from 'react'

// const a=[1,2,3,4,5,6,7,8,9,10,11,12]

const Profilepost = ({userPost,setCurrenPost,singlePostView}) => {
 
  return (
    <div className='flex flex-col items-center  mt-10 '>
        <h1 className='text-[2rem] text-white'>Your Posts</h1>
   <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1 '>
{userPost.map((element)=>{
  console.log(element,"post each one");
  const {Post,post} = element
  const ext = Post.split('.')[1];
    return(
        <div className='bg-main text-white  w-[10rem]  h-[10rem] md:w-[13rem]  md:h-[13rem]' onClick={()=>{
          singlePostView(element._id)
        }}>
               <img src={`data:image/${ext};base64, ${post}`} alt="Red dot" className='h-full w-full object-cover' />
            </div>
    )
})}

   </div>
    </div>
  )
}

export default Profilepost