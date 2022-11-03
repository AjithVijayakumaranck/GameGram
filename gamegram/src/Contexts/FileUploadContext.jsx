import React, { createContext, useState } from "react";

export const FileUpContext = createContext();
export const FileUpProvider = ({children})=>{
    const [file,setFile]=useState({
        file:"",
        fileUrl:"",
        Caption:""
      })
    return(
        <FileUpContext.Provider 
        value={{
            fileSave : [file,setFile]
        }}
        >
            {children}
        </FileUpContext.Provider>
    )
}   