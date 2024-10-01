import axios from "axios";
import {jwtDecode} from 'jwt-decode'
import Cookie from 'js-cookie';


const baseUrl = "http://localhost:5000";




const signIn = async (username, password, setLoginAdmin, navigate) => {
  try {
    if(username&&password)
    {

        await axios
      .post(`${baseUrl}/login`, {
        f_userName: username,
        f_Pwd: password,
      })
      .then((res) => {
        alert(res.data.message);
        if(res.data.status)
          Cookie.set('token', res.data.token,{expires:1});  
        const tokenObj = jwtDecode(res.data.token);
        setLoginAdmin(tokenObj);
        navigate("/");
      });
    }
    else{
        alert("Enter all required field");
    }
  } catch (err) {
    console.log("Error while login........");
  }
};

export {  signIn};
