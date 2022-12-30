import React, { createContext, useState } from "react";

export const  UserProfileContext = createContext();
export const UserProfileProvider = ({children})=>{
    const [profUser,setprofUser] =useState('');
    return(
        <UserProfileContext.Provider 
        value={{
           Profile:[profUser,setprofUser]
        }}
        >
            {children}
        </UserProfileContext.Provider>
    )
}   