import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';


const Layout = ({ admin,setLoginAdmin }) => {
  return (
    <div>
      <Navbar admin={admin} setLoginAdmin={setLoginAdmin} />

      <Outlet />
    </div>
  );
};

export default Layout;
