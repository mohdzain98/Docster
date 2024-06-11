const express = require('express')
const router = express.Router();
const Moretokens = require('../models/MoreTokens')
const fetchuser = require('../middleware/fetchuser')
const User = require('../models/User')

router.post('/getmore',fetchuser, async (req,res) => { 
    const {email, text} = req.body
    let success=false
    try{
        const userId =req.user.id
        const user = await User.findById(userId).select("-password")
        if(user.email.toString() != email.toString()){
            return res.status(401).json({success, errors:"Email Doesn't Match"})
        }
        let already = await Moretokens.findOne({"email": email})
        if(already){
            return res.status(401).json({success, errors:"Request Already Exist"})
        }
        let mtok = await Moretokens.create({
            uid:userId,
            uname: user.name,
            email: email,
            text: text
        })
        success=true
        res.json({success})
    }catch(error){
        console.error(error)
        res.status(500).send('internal server error')
    }
})

module.exports = router