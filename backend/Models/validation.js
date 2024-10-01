const Joi = require('joi');


const empValidate =(data)=>{
    const employeeSchema = Joi.object({
        f_Name: Joi.string().required().messages({
          'string.empty': 'Name is required',
        }),
        f_Email: Joi.string().email().required().messages({
          'string.email': 'Invalid email format',
          'string.empty': 'Email is required',
        }),
        f_Mobile: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
          'string.length': 'Mobile number should be exactly 10 digits',
          'string.pattern.base': 'Mobile number must contain only digits',
          'string.empty': 'Mobile number is required',
        }),
        f_Designation: Joi.string().required().messages({
          'string.empty': 'Designation is required',
        }),
        f_gender: Joi.string().valid('Male', 'Female').required().messages({
          'string.valid': 'Invalid gender',
          'string.empty': 'Gender is required',
        }),
        f_Course: Joi.string().default('Hello').messages({
          'string.empty': 'Course is required',
        }),
      });
      return employeeSchema.validate(data);

}


module.exports={empValidate}