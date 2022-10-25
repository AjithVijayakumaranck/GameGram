import React from 'react'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import Home from './Pages/home'
import Login from './Pages/LoginPage'
import LoginSignup from './Pages/LoginSignup'


const MainRoutes = () => {
  return (
    <div>
<Router>
        <Routes>
              {/* <Route exact path='/home' element={ 
          <ProtectedRoutes >
            <Home />
             </ProtectedRoutes>
                } /> */}

          
           <Route path='/home' element={<Home />}/>  

           <Route  exact path="/" element={<Login/>}/>
           <Route exact path="/createaccount" element={<LoginSignup/>}/>

        </Routes>
        </Router>
    </div>
  )
}

export default MainRoutes