import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Conversation = ({conversation,currentUser,currentChat,setCurrentChat}) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        console.log(conversation, "conversation");
        console.log(currentUser, "current");
        console.log(conversation[0].member, "friend")
        let friendId
        
    const getUser = async (friendId) => {
        console.log(friendId,"hello friend");
        axios.get(`http://localhost:5000/getuserprofile/${friendId}`).then((response) => {
            console.log(response.data.response, "heee hoooo")
            setUser({...user,...response.data.response})
        })
    }


        const friendUser = async () => {
            console.log(currentUser, "currenthhh");
            friendId = await conversation[0].member.find((m) => m !== currentUser);
            getUser(friendId)
        }
        friendUser()


    }, [currentUser, conversation])
  return (
    <div onClick={()=>{
        console.log(conversation,'hello');
        setCurrentChat(...conversation)
        console.log(currentChat,"current chatt");
    }}>
    <div className='flex  py-3 px-3 justify-between items-center w-full'>
    <div>
        <div className='w-[3rem] bg-dark h-[3rem] rounded-full   flex justify-center items-center border-[1px] border-main'>
        </div>
    </div>

    <div className='px-5 w-full'>
        <p className='p-0 m-0 leading-[1] '>{user.name}</p>
        {/* <p className='p-0 m-0 leading-[1.4] text-sm'>last message here</p>   */}
    </div>


    <div >
        <h1 className='text-right text-[10px]'>
            12.00am
        </h1>
    </div>

</div>
  <div className='px-8 '>
                            <hr className='border-lightContrast border-t-2 ' />
                        </div>
</div>
  )
}

export default Conversation