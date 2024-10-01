const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Admin } = require("../Models/admin");
const { empValidate } = require("../Models/validation");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

router.post('/admins', async (req, res) => {
  try {
    const { f_userName, f_Pwd } = req.body;
    const hashedPwd = await bcrypt.hash(f_Pwd, process.env.JWTPRIVATEKEY = 10);
    const newAdmin = new Admin({f_userName, f_Pwd: hashedPwd });

    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/admins/:adminId/employees", upload.single('image'), async (req, res) => {
  try {
    const newEmployee = {
      f_Name: req.body.name,
      f_Email: req.body.email,
      f_Mobile: req.body.mobile,
      f_Designation: req.body.designation,
      f_gender: req.body.gender,
      f_Course: req.body.courses
    };

    const { error } = empValidate(newEmployee);
    if (error)
      return res.json({ message: error.details[0].message });

    const admin = await Admin.findById(req.params.adminId);

    if (admin) {
      
      const exitingEmp = admin.employees.find((emp)=>emp.f_Email.toString() === req.body.email.toString());

      if(exitingEmp)
        return res.json({staus:false,message:"Emplyoee with same email id already exist"});

      const validEmployee = {
        f_Name: req.body.name,
        f_Image: {
          data: req.file.filename,
          contentType: req.file.mimetype
        },
        f_Email: req.body.email,
        f_Mobile: req.body.mobile,
        f_Designation: req.body.designation,
        f_gender: req.body.gender,
        f_Course: req.body.courses
      };

      admin.employees.push(validEmployee);
      await admin.save();
      res.json({ message: "Successfully" });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

router.get("/admins/:adminId/employees", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.adminId);
    if (admin) {
      const employeesWithImageUrls = admin.employees.map(emp => ({
        ...emp.toObject(),
        f_Image: {
          ...emp.f_Image,
          url: `${req.protocol}://${req.get('host')}/uploads/${emp.f_Image.data}`
        }
      }));
      res.status(200).json(employeesWithImageUrls);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/admins/:adminId/employees/:empId", upload.single('image'), async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const empId = req.params.empId;

    const newEmployee = {
      f_Name: req.body.name,
      f_Email: req.body.email,
      f_Mobile: req.body.mobile,
      f_Designation: req.body.designation,
      f_gender: req.body.gender,
      f_Course: req.body.courses
    };

    const { error } = empValidate(newEmployee);
    if (error)
      return res.json({ message: error.details[0].message });

    const admin = await Admin.findById(adminId);

    if (admin) {
      const employeeIndex = admin.employees.findIndex(emp => emp._id.toString() === empId);
      if (employeeIndex === -1) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const oldImage = admin.employees[employeeIndex].f_Image.data;

      const updatedEmployee = {
        f_Name: req.body.name,
        f_Image: req.file ? {
          data: req.file.filename,
          contentType: req.file.mimetype
        } : admin.employees[employeeIndex].f_Image,
        f_Email: req.body.email,
        f_Mobile: req.body.mobile,
        f_Designation: req.body.designation,
        f_gender: req.body.gender,
        f_Course: req.body.courses
      };

      admin.employees[employeeIndex] = updatedEmployee;
      await admin.save();

      if (req.file && oldImage) {
        fs.unlink(path.join(__dirname, '..', 'uploads', oldImage.toString()), err => {
          if (err) console.error(err);
        });
      }

      res.send({ message: "Employee updated successfully" });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/admins/:adminId/employees/:empId", async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const empId = req.params.empId;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const employeeIndex = admin.employees.findIndex(emp => emp._id.toString() === empId);
    if (employeeIndex === -1) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const oldImage = admin.employees[employeeIndex].f_Image.data;

    admin.employees.splice(employeeIndex, 1);
    await admin.save();

    if (oldImage) {
      fs.unlink(path.join(__dirname, '..', 'uploads', oldImage.toString()), err => {
        if (err) console.error(err);
      });
    }

    res.send({ status: true, message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
