const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema({
    f_Image: {
      data:Buffer,
      contentType:String,
    },
    f_Name: {
      type: String,
      required: true,
    },
    f_Email: {
      type: String,
      required: true,
    },
    f_Mobile: {
      type: String,
      required: true,
    },
    f_Designation: {
      type: String,
      required: true,
    },
    f_gender: {
      type: String,
      required: true,
    },
    f_Course: {
      type: String,
      required: true,
    },
    f_Createdate: {
      type: Date,
      default: Date.now,
    },
  });

const loginSchema = new mongoose.Schema({
  f_userName: {
    type: String,
    required: true,
  },
  f_Pwd: {
    type: String,
    required: true,
  },
  employees:[employeeSchema],
});

const complexityOptions = {
  min: 8,
  max: 30,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
};
const Admin = mongoose.model("Admin", loginSchema);

const generateAuthToken =  (admin) => {
  const token = jwt.sign({ _id: admin._id,f_userName:admin.f_userName }, process.env.JWTPRIVATEKEY, {
    expiresIn: "1h",
  });
  return token;
};


const Loginvalidate = (data) =>{
    const schema = Joi.object({
      f_userName: Joi.string().min(6).max(15).required().label("Username"),
      f_Pwd: passwordComplexity(complexityOptions).required().label("Password")
      });
    return schema.validate(data);
}

module.exports={Admin,Loginvalidate,generateAuthToken}
