import { Navigate, Outlet } from 'react-router-dom'
const PrivateRoutes = () => {

  let auth = localStorage.getItem('logged')
  console.log(auth);
return (
    auth ?   <Outlet/> : <Navigate to='/'/>
  )
}

export default PrivateRoutes