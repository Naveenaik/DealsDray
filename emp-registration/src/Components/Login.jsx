import React, { useState } from 'react'
import { signIn } from '../utilis/HandleLogin';
import { useNavigate } from "react-router-dom";

const Login = ({ setLoginAdmin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  return (
    <div>
      <div className='flex justify-center h-10 font-bold text-2xl mt-10' >Login Page</div>
      
      <div className='flex justify-center'>
      <div className=" md:w-1/3 max-w-sm mt-10">
        <input
          className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded outline-none"
          type="text"
          placeholder="Username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded mt-4 outline-none"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="mt-4 flex justify-between font-semibold text-sm"></div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 w-[24rem] bg-[#32e129] hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
            onClick={async () => {
              await signIn(username, password, setLoginAdmin, navigate);
            }}
          >
            Login
          </button>
        </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default Login