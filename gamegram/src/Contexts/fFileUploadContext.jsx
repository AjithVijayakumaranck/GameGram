import React, { createContext, useState } from "react";

export const FileUploadContext = createContext();
export const FileUploadProvider = ({children})=>{
    const [showModal,setShowModal] = React.useState(false);
    return(
        <FileUploadContext.Provider 
        value={{
            fileUploa: [showModal,setShowModal]
        }}
        >
            {children}
        </FileUploadContext.Provider>
    )
}   