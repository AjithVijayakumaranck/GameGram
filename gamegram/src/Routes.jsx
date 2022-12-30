import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./Components/FileUpload";
import ForgotPassword from "./Components/forgotPassword";
import Navbar from "./Components/navbar";
import PasswordReset from "./Components/PasswordReset";
import VerificationOtp from "./Components/verificationOtp";
import VerificationOtpForgot from "./Components/verificationOtpForgot";
import AdminHome from "./Pages/AdminPages/AdminHome";
import AdminLogin from "./Pages/AdminPages/adminLogin";
import DashBoard from "./Pages/AdminPages/DashBoard";
import PostsAdmin from "./Pages/AdminPages/PostsAdmin";
import Reports from "./Pages/AdminPages/Reports";
import Users from "./Pages/AdminPages/Users";
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
    axios.post("http://gamegram.ga/api/isUserAuth").then((response) => {
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
          <Route exact path="/verificationotpforgot/:mailid" element={ <VerificationOtpForgot />  } />
          <Route exact path="/createaccount" element={<LoginSignup />} />
          <Route exact path="/resetpassword/:userId" element={<PasswordReset />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/message" element={<Chatingwindow />}></Route>
          <Route exact path="/adminlogin" element={<AdminLogin />}></Route>
    <Route exact path="/adminhome" element={<AdminHome />}>
          <Route path="users" element={<Users/>}/>
          <Route path="dashboard" element={<DashBoard/>}/>
          <Route path="posts" element={<PostsAdmin/>}/>
          <Route path="reports" element={<Reports/>}/>
    </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoutes;
