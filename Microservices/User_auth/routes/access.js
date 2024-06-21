const express = require('express')
const router = express.Router();
// const User = require('../models/User')
const Access = require('../models/Acess')
const {body, validationResult} = require('express-validator')

//adding user

router.post('/giveaccess',[
    body('name','Enter a Valid name').isLength({min:3}),
    body('email','Enter a Valid Email').isEmail()
],async (req,res)=>{
    let success = false;
    //if there are error return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        let user = await Access.findOne({"email": req.body.email})
        if(user){
            return res.status(400).json({success, error:"Email Already Exist"})
        }
        user = await Access.create({
            name: req.body.name,
            email: req.body.email,
            
        })
        success=true
        res.json({success,user})
    }catch(err){
        console.error(err.message)
        res.status(500).send("Some Error Occured")
    }
})

module.exports = router