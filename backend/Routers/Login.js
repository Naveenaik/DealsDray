const {Router} = require('express');

const bcrypt = require("bcrypt");

const router =Router()

const jwt = require("jsonwebtoken");

const {Admin,Loginvalidate,generateAuthToken} = require("../Models/admin")

router.post("/login", async(req,res)=>{
    try{          
        const {error} = Loginvalidate(req.body);
        if(error)
            return res.send({message:error.details[0].message})

        const admin = await Admin.findOne({f_userName:req.body.f_userName})
        if(!admin)
            return res.send({message:"Invalid Username or password"})

        const validPassword = await bcrypt.compare(req.body.f_Pwd,admin.f_Pwd)
        if(!validPassword)
            return res.send({message:"Invalid Username or password"})

        const token = generateAuthToken(admin)
        res.send({status:true,message:"Logged in successfully",token:token})

    }

    catch(err)
    {
        res.send({message:"Internal server error"})
    }

})

module.exports = router;