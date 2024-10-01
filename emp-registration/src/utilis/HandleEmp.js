import axios from "axios";

const baseUrl = "http://localhost:5000";

const EmpDetails = async (adminId, formData,setFlag) => {
  try {
    await axios.post(`${baseUrl}/admins/${adminId}/employees`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
    })
    .then((res) => {
      if(!res.data.status)
        setFlag(true);
      alert(res.data.message);
    });
  } catch (err) {
    console.log("Error while submitting: ", err.message);
  }
};

const getEmpDetails = async (adminId) =>{
  try{
   const response = await axios.get(`${baseUrl}/admins/${adminId}/employees`);
   
   console.log(response.data);
  return response.data;

  }catch(err){
    console.log("Error while fetching")
  }
}


const updateEmpDetails = async (adminId,empId,formData,setFlag) => {
  
  try {
    const response = await axios
      .put(`${baseUrl}/admins/${adminId}/employees/${empId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      })
      .then((res) => {
        if(res.data.status)
        setFlag(false);
        alert(res.data.message);
      });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const deleteEmpDetais = async (adminId, empId) => {
  try {
    const response = await axios
      .delete(`${baseUrl}/admins/${adminId}/employees/${empId}`)
      .then(({ data }) => {
        console.log(data);
      });
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { EmpDetails,getEmpDetails,deleteEmpDetais,updateEmpDetails };
