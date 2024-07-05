const express = require('express')
const router = express.Router();
const User = require('../models/User')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const Access = require('../models/Acess')
require('dotenv').config()


const JWT_SECRET = process.env.REACT_APP_JWTS

router.post('/existuser',async(req,res)=>{
    let success = true;
    const {email} = req.body
    try{
        let user = await User.findOne({email})
        if(user){
            return res.json({success, id:user.id, name:user.name, msg:'Email Already Exist'})
        }
        success=false
        return res.json({success, msg:'Email Not Found'})
    }
    catch(error){
        res.status(500).send("Internal server occured")
    }
})
//create a user using : POST "/api/auth" doesn't require auth
router.post('/createuser',[
    body('name','Enter a Valid name').isLength({min:3}),
    body('email','Enter a Valid Email').isEmail(),
    body('password','Enter a Valid Password').isLength({ min: 5 }),
], async (req,res)=>{
    let success = false;
    //if there are error return bad request
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(500).json({msg:'error occurred',errors:errors.array()})
    }

    // check email already exist
    try{
        let user = await User.findOne({"email": req.body.email})
        if(user){
            return res.status(400).json({success, error:"Email Already Exist"})
        }
        //If email is unique create user 
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password,salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password:secPass,
            currentToken:{
                cToken:0,
                gToken:0
            }
        })
        const data={
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success, authToken})
    }catch(err){
        res.status(500).send("Some Error Occured")
    }
})

router.post('/login',[
    body('email','Enter a Valid Email').isEmail(),
    body('password','Password cannot be Blank').exists(),
],async (req,res) => {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({success, errors:errors.array()})
    }

    const {email, password} = req.body
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success, errors:'Email Not Found Kindly Signup'})
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(401).json({success, errors:'Wrong Password'})
        }
        const data={
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authToken})
    }catch(error){
        res.status(500).send("Internal server occured")
    }
})

//Route 3 : Get loggedin user detail : POST "/api/auth/getuser"
router.post('/getuser',fetchuser, async (req,res) => {
    try{
        const userId =req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        res.status(500).send('internal server error')
    }
})

router.post('/glogin', async (req,res) => {
    let success = false;
    const {email} = req.body
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success, errors:'Email Not Found Kindly Signup'})
        }
        const data={
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authToken})
    }catch(error){
        res.status(500).send("Internal server occured")
    }
})

//Route 3 : Get loggedin user detail : POST "/api/auth/getuser"
router.post('/getuser',fetchuser, async (req,res) => {
    try{
        const userId =req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        res.status(500).send('internal server error')
    }
})

// Route 4: Update Current Tokens: POST "api/auth/updatect"
router.put('/updatect', fetchuser, async(req,res)=>{
    const {ct, gt} =req.body
    try{
        const newToken={}
        if(ct){newToken.cToken = ct}
        if(gt){newToken.gToken = gt}

        //find a user and update it
        let user = await User.findById(req.user.id)
        if(!user){return res.status(404).send("Not Found")}

        // if(user.id.toString() !== req.user.id){
        //     return res.status(401).send("Not Allowed")
        // }
        update = await User.findByIdAndUpdate(req.user.id, {currentToken:{
            cToken:Number(user.currentToken.cToken) + Number(newToken.cToken),
            gToken:Number(user.currentToken.gToken) + Number(newToken.gToken)
        }},{new:true})
        const useru = await User.findById(req.user.id).select("-password")
        res.send(useru)
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
})

//Route 5 : update max token
router.put('/updatemt/:id',fetchuser, async(req,res) => {
    const {mt} = req.body
    try{
        const newVal={}
        if(mt){newVal.maxToken = mt}
        //find a user and update it
        let user = await User.findById(req.params.id)
        if(!user){return res.status(404).send("Not Found")}

        if(user.id.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        
        user = await User.findByIdAndUpdate(req.params.id, {maxToken:newVal.maxToken},{new:true})
        res.json({user})
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
})

router.put('/updatepass/:id',async(req,res)=>{
    const {npass} = req.body
    try{
        const np={}
        if(npass){np.pass = npass}
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(np.pass,salt)
        const update = await  User.findByIdAndUpdate(req.params.id,{password:secPass},{new:true})
        res.json({success:true,val:update})
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
})

//Route 6: checking User
router.post('/checkuser',fetchuser,async(req,res) => {
    const {moreTokens} = req.body
    try{
        let user= await User.findById(req.user.id)
        let email = user.email
        let access = await Access.findOne({"email": email})
        if(!user){return res.status(404).send("Not Found")}

        let curTokens =  Number(user.currentToken.cToken) + Number(user.currentToken.gToken) + Number(moreTokens)
        let ready = false
        if(curTokens < user.maxToken || access){
            ready=true
        }else{
            return res.status(401).send("Tokens Limits Reached")
        }
        res.json({curTokens,ready})
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
})

//Route 7 delete user:
router.delete('/deleteuser/:id',fetchuser, async(req,res) =>{
    try{
        //find a user and delete it
        let user = await User.findById(req.params.id)
        if(!user){return res.status(404).send("Not Found")}

        //Allow deletion only if user is owner
        if(user._id.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        user = await User.findByIdAndDelete(req.params.id)
        res.json({"success":"User has been deleted"})
    }catch(error){
        res.status(500).send("Internal Server Error")
    }
})


module.exports = router