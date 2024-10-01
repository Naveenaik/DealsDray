import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const Navbar = ({ admin, setLoginAdmin }) => {
  
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookie.remove("token");
    setLoginAdmin({});
    navigate("/login");
  };

  return (
    <div>
      <div className="text-gray-400 bg-white h-[60px] max-w-[1300px] mx-auto flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-3xl font-bold primary-color">
          Employee Registration
        </h1>
        <ul className="hidden md:flex">
          <li className="p-5">
            <Link to="/" className="hover:text-red-500">
              Home
            </Link>
          </li>
          <li className="p-5">
            <Link to="/employee" className="hover:text-red-500">
              Employees
            </Link>
          </li>
          <li className="p-5 text-[#000]">
            <b>{admin.f_userName}</b>
          </li>
          <li className="p-5">
            <button className="hover:text-red-500" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
