import React, { useEffect, useState } from "react";
import {
  deleteEmpDetais,
  EmpDetails,
  getEmpDetails,
  updateEmpDetails,
} from "../utilis/HandleEmp";

import Search from "./Search";

const Employee = ({ admin }) => {
  const [flag, setFlag] = useState(false);
  const [create, setCreate] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [courses, setCourses] = useState({});
  const [image, setImage] = useState(null);
  const [empId,setEmpId] = useState("")

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCourses((prevCourses) => ({
      ...prevCourses,
      [name]: checked,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name &&
      email &&
      mobile &&
      designation &&
      gender &&
      image &&
      courses
    ) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("mobile", mobile);
      formData.append("designation", designation);
      formData.append("gender", gender);
      formData.append(
        "courses",
        JSON.stringify(Object.keys(courses).filter((course) => courses[course]))
      );
      formData.append("image", image);

     create?await EmpDetails(admin._id, formData,setFlag): await updateEmpDetails(admin._id,empId,formData,setFlag) ;
      
      
       setName("");
      setEmail("");
      setMobile("");
      setDesignation("");
      setGender("");
      setCourses({});
      setImage(null);
      setEmpId("");

    } else {
      alert("Please fill in all required fields.");
    }
  };

  const [empList, setEmpList] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(false);

  const fetchToDos = async () => {
    try {
      const empList = await getEmpDetails(admin._id);
      if (!Array.isArray(empList)) {
        throw new Error("Data fetched is not an array");
      }
      setEmpList(empList || []);
    } catch (err) {
      console.log("Error fetching ", err);
      setEmpList([]);
    }
  };

  useEffect(() => {
    fetchToDos();
  }, [shouldFetch || flag]);

  const handleDelete = async (empId) => {
    if (window.confirm("Are you sure?")) {
      await deleteEmpDetais(admin._id, empId);
      setShouldFetch(!shouldFetch);
    }
  };

  const handleUpdate = (emp) => {
    setEmpId(emp._id);
    setName(emp.f_Name);
    setEmail(emp.f_Email);
    setMobile(emp.f_Mobile);
    setDesignation(emp.f_Designation);
    setGender(emp.f_gender);
    setCourses({
      MCA: emp.f_Course.includes("MCA"),
      BCA: emp.f_Course.includes("BCA"),
      BSC: emp.f_Course.includes("BSC"),
    });
    setFlag(true);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filteredEmployee = empList
    .filter((emp) => emp.f_Name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.f_Name.localeCompare(b.f_Name));
  return (
    <div>
      <div>
        <button
          className="bg-[#e0ac29] p-2 rounded"
          onClick={() => {setFlag(!flag)
            setCreate(!create)
          }}
        >
          {flag ? "View Employee List" : "Create an Employee"}
        </button>
      </div>
      <br />
      {flag ? (
        <div>
          <div className="flex justify-center">
            <form
              onSubmit={handleSubmit}
              className="w-[500px] grid grid-cols-2 gap-5"
            >
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="mobile">Mobile No</label>
                <input
                  type="tel"
                  className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="designation">Designation</label>
                <select
                  className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  required
                >
                  <option value="">Select Designation</option>
                  <option value="HR">HR</option>
                  <option value="Manager">Manager</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>
              <div>
                <label>Gender</label>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  <label htmlFor="male" className="mr-4 ml-1">
                    Male
                  </label>
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  <label htmlFor="female" className="ml-1">
                    Female
                  </label>
                </div>
              </div>
              <div>
                <label>Courses</label>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="MCA"
                      name="MCA"
                      checked={courses.MCA || false}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="MCA" className="ml-1">
                      MCA
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="BCA"
                      name="BCA"
                      checked={courses.BCA || false}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="BCA" className="ml-1">
                      BCA
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="BSC"
                      name="BSC"
                      checked={courses.BSC || false}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="BSC" className="ml-1">
                      BSC
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="imageUpload">Image Upload</label>
                <input
                  type="file"
                  accept=".jpg,.png"
                  className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded"
                  onChange={handleImageChange}
                  required
                />
              </div>
              <div className="col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Search setSearchQuery={setSearchQuery} />
          <div className="flex justify-center mt-5">
            <table className="border">
              <thead>
                <tr>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Mobile No</th>
                  <th className="p-3">Designation</th>
                  <th className="p-3">Gender</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Create Date</th>
                  <th colSpan="2" className="p-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployee.map((emp) => (
                  <tr key={emp._id}>
                    <td className="p-3">
                      <img
                        className="rounded-full h-10 w-10"
                        src={emp.f_Image.url}
                        alt={emp.f_Name}
                        width="100"
                        height="100"
                      />
                    </td>
                    <td className="p-3">{emp.f_Name}</td>
                    <td className="p-3">{emp.f_Email}</td>
                    <td className="p-3">{emp.f_Mobile}</td>
                    <td className="p-3">{emp.f_Designation}</td>
                    <td className="p-3">{emp.f_gender}</td>
                    <td className="p-3">{emp.f_Course.slice(2,5)}</td>
                    <td className="p-3">{emp.f_Createdate}</td>
                    <td className="p-3">
                      <button
                        className="bg-[#70ed28] px-3 rounded"
                        onClick={() => handleUpdate(emp)}
                      >
                        Edit
                      </button>
                    </td>
                    <td className="p-3">
                      <button
                        className="bg-[#ed282b] px-3 rounded"
                        onClick={() => handleDelete(emp._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;
