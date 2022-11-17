import React from 'react'
import {format} from 'timeago.js'


const Messages = ({own,message}) => {
    // console.log(message,"hello mesafge");
  return (
   

<>
<div className={`w-full flex  ${own ? 'justify-end' : "justify-start"}`}>
     <div className='my-1'>
     <div className= {own ? 'text-[13px] bg-main  text-dark text-sm  px-4 rounded-lg rounded-br-none inline-block ' : `bg-secondary text-[13px] text-white text-sm  px-4 rounded-lg rounded-bl-none inline-block `}>
            {message.text}
        </div>
            <p className={`text-[7px]  ${own ? "text-right" : 'text-left'}`}>{format(message.createdAt)}</p>
     </div>
    </div>

    
</>

  )
}

export default Messages