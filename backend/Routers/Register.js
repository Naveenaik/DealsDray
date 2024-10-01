const {Router} = require('express');

const bcrypt = require("bcrypt");

const router = Router();

const {Admin,validate} = require("../Models/admin")

router.post("/register",async(req,res)=>{
    try{
        const {error} = validate(req.body);
        if(error)
            return res.send({message:error.details[0].message})
        const admin = await Admin.findOne({email:req.body.email})
        if(admin)
            return res.send({message:"User with email already exist"})
        const salt =await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password,salt)
        await new Admin({...req.body,password:hashPassword}).save()
        res.send({message:"User created successfully"})
    }
    catch(err)
    {
        res.send({message:"Internal server error"})
    }
})


module.exports = router;    