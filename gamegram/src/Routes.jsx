import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./Components/FileUpload";
import ForgotPassword from "./Components/forgotPassword";
import Navbar from "./Components/navbar";
import VerificationOtp from "./Components/verificationOtp";
import Chatingwindow from "./Pages/chating";
import EditProfile from "./Pages/editProfile";
import Home from "./Pages/home";
import Login from "./Pages/LoginPage";
import LoginSignup from "./Pages/LoginSignup";
import Profile from "./Pages/Profile";
import PrivateRoutes from "./Utilities/protected";
const token = localStorage.getItem("token");
axios.defaults.headers.common["Authorization"] = token;

const MainRoutes = () => {
  const [isAuth, setIsAuth] = useState(false);

  const auth = () => {
    axios.post("http://localhost:5000/isUserAuth").then((response) => {
      setIsAuth(true);
    });
  };

  useEffect(() => {
    auth();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
     <Route element={<PrivateRoutes/>}>
          <Route element={<Home/>}  path="/home"/>
          <Route element={<Profile/>} path="/userprofile/:id"/>
          <Route element={<EditProfile/>} path="/editprofile/:id"/>
     </Route>
          <Route exact path="/" element={ <Login />  } />
          <Route exact path="/verificationotp/:mailid" element={ <VerificationOtp />  } />
          <Route exact path="/createaccount" element={<LoginSignup />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/message" element={<Chatingwindow />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoutes;
