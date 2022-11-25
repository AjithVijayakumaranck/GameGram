import React from 'react'

const Details = ({setShowModal,currentUser}) => {
  return (
    <div>
       
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-blur-sm"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-md shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {currentUser.name}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <div className="modalBody pt-8 ">  
<div className='flex justify-between '>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Username</h4>
 <h5 className='font-medium text-slate-500 '>{currentUser.userName}</h5>
</div>
<div  className='text-right'>
<h6 className='font-bold  pt-2 pb-1'>Display name</h6>
 <h5 className='font-medium text-slate-500'>{currentUser.name}</h5>
</div>
</div>
<div className='flex justify-between gap-44 pt-2'>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Email</h4>
 <h5 className='font-medium text-slate-500 '>{currentUser.email}</h5>
</div>
<div  className='text-right'>
<h6 className='font-bold  pt-2 pb-1'>Block Status</h6>
 <h5 className='font-medium text-slate-500'>{currentUser.Blocked ? "blocked" : "Active"}</h5>
</div>
</div>
<hr className='mt-5 border-t-2 border-t-admin' />

<div className='flex justify-between  pt-2'>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Followers</h4>
 <h5 className='font-medium text-dark  text-center text-2xl'>{currentUser.followers.length}</h5>
</div>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Following</h4>
 <h5 className='font-medium text-dark  text-center text-2xl'>{currentUser.following.length}</h5>
</div>
<div className='text-left'>
<h4 className='font-bold pt-2 pb-1'>Posts</h4>
 <h5 className='font-medium text-dark  text-center text-2xl'>{currentUser?.post?.length}</h5>
</div>

</div>

    </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end  p-6 border-t border-solid border-slate-200 rounded-b">
           
                  <button
                    className="bg-main text-dark active:bg-emerald-600 w-full font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                   Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        
    </div>
  )
}

export default Details