import SignIn from "./Components/Login";
import Home from "./Components/Home";

// import axios from "axios";


import {jwtDecode} from 'jwt-decode'

import Cookie from 'js-cookie';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Employee from "./Components/Employee";
import Layout from "./Components/Layout";


function App() {
  const [admin, setLoginAdmin] = useState({});

  useEffect(() => {
    const token = Cookie.get('token');
    if (token) {
      try {
        const tokenObj = jwtDecode(token) ;

        if (tokenObj && tokenObj._id) {
          console.log(tokenObj._id);
          setLoginAdmin(tokenObj);
        }
      } catch (error) {
        console.error("Failed to parse token:", error);
      }
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route
            exact
            path="/"
            element={
              (admin && admin._id) || (Cookie.get('token') && jwtDecode( Cookie.get('token'))._id )? (
                <Home admin={admin} setLoginAdmin={setLoginAdmin} />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<SignIn setLoginAdmin={setLoginAdmin} />}
          ></Route>
          <Route path="/" element={<Layout admin={admin} setLoginAdmin={setLoginAdmin} />}>
          <Route path="/employee" element={<Employee admin={admin}/>}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
