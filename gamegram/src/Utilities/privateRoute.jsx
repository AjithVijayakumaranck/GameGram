import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'



const PrivateRoutes = () => {
    
    
    

    // const auth = () => {
    //     return new Promise((resolve,reject) => {
    //     const token =  localStorage.getItem("token")
    //     axios.defaults.headers.common['Authorization']=token
    //     axios.post("http://localhost:5000/isUserAuth").then((response)=>{
    //         alert("all set")
    //         console.log("resposnsss",response);
    //           resolve(true)
    //           console.log(isAuth);
              
    //         }).catch((err)=>{
    //         resolve(false)
    //         alert("not ser")
    //         console.log(err,"hekko");
    //     })
    // })
    // }

    // useEffect(()=>{
    //  auth().then(( response ) => {
    //     setIsAuth(response);
    // })
    // .catch(()=>{
    //     setIsAuth(false);
    //  })
    //  },[])



 



    return (
        isAuth.token ? <Outlet/> : <Navigate to='/'/>
      )
}

export default PrivateRoutes