import { Navigate, Outlet,Route } from 'react-router-dom'

import axios from 'axios'
import { useEffect,useState } from 'react';

const token =  localStorage.getItem("token")
axios.defaults.headers.common['Authorization']=token

const ProtectedRoutes = ({ children }) => {
  const [isAuth,setIsAuth]=useState(true)


  const auth = async ()=>{ 
    let response = await axios.post("http://localhost:5000/isUserAuth")
    setIsAuth(response.data.isAuth);
  }


  useEffect(()=>{
     auth();
  },[])


return isAuth ? children : <Navigate to='/' replace  />;
}

export default ProtectedRoutes 