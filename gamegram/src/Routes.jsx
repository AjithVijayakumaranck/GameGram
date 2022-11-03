import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUpload from "./Components/FileUpload";
import Home from "./Pages/home";
import Login from "./Pages/LoginPage";
import LoginSignup from "./Pages/LoginSignup";
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
          <Route element={<Home/>}  path="/Home"/>
     </Route>
          <Route exact path="/" element={ <Login />  } />
          <Route exact path="/createaccount" element={<LoginSignup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoutes;
