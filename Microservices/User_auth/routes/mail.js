const express = require('express')
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const NodeCache = require('node-cache');
const otpCache = new NodeCache({ stdTTL: 300 });
const nodemailer = require('nodemailer');
require('dotenv').config()
const mail_host = process.env.MAIL_HOST
const mail_user = process.env.MAIL_USER 
const mail_pass = process.env.MAIL_PASS
const mail_port = process.env.MAIL_PORT


const transporter = nodemailer.createTransport({
    host: mail_host,
    port: mail_port,
    auth: {
      user: mail_user, 
      pass: mail_pass 
    }
  });

const generateOTP = async() =>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}
const storeOTP = async (userId, otp)=> {
    otpCache.set(userId, otp);
}

const generateUserId = async() =>{
    return uuidv4();
}

const emailSignature = `
  <div id="footer" class="box" style="background-color: lightgrey; width: auto; position:relative; box-shadow: 0 25px 25px rgba(0, 0, 0, 0.1); padding: 25px;">
            <p>Best Regards</p>
            <p style="margin-top: -15px; font-size:15px;">Docschat, UP, India</p>
            <ul style="list-style: none; padding: 0;">
                <li style="display: inline; margin-right: 5px; font-size: 13px;"><a href="https://docschat.in" style="text-decoration: none;">View Site</a></li>
                <li style="display: inline; margin-right: 5px; font-size: 13px;"><a href="https://docschat.in/privacy-policy" style="text-decoration: none;">Privacy Policy</a></li>
                <li style="display: inline; margin-right: 5px; font-size: 13px;"><a href="https://docschat.in/in/terms" style="text-decoration: none;">Terms of Service</a></li>
            </ul>
    </div>
`;

router.post('/sendmail', async (req,res) =>{
    const {email, name}  = req.body
    const userId = await generateUserId();
    const otp = await generateOTP();
    await storeOTP(userId, otp);
    const mailOptions = {
        from: 'support@docschat.in',
        to: email, 
        subject: 'Docschat Account Verification', 
        html: `<div class='box' style="width: auto; position:relative; background: ghostwhite; box-shadow: 0 25px 25px rgba(0, 0, 0, 0.1); padding: 25px; border-radius:10px;">
                    <center><img src="https://drive.google.com/thumbnail?id=1g8bbF8UZo_ylH4vSbGTKS2oOemw-7rYO&sz=w1000" width='256px'></center>
                    <h4 style="color: #6c757d; margin: 1rem 0;">Hi ${name}, Welcome to Docschat</h4>
                    <p >We hope this email finds you well</p>
                    <center>
                        <p style='font-family: "Times New Roman", Times, serif; font-weight: bolder; font-size:large;'>Your Verification code is</p>
                        <button style='border-radius: 5px; background:skyblue; font-size: 20px; padding: 1%; width: 200px; border: none;'>${otp}</button>
                    </center>
                    <p>Hope to see you soon</p>
                </div>
                ${emailSignature}
               ` // HTML body
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({
                success: false,
                msg: `error occurred: ${error}`,
                uid:null
            });
        }
        return res.json({
            success: true,
            msg: `Email sent successfully: ${info.response}`,
            uid:userId
        });
    });
})

router.post('/contact',async(req,res)=>{
    const {subject, body, to} = req.body
    const mailOptions = {
        from: 'support@docschat.in',
        to: to,
        subject: `${subject}`,
        html: `${body}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return res.json({
            success: false,
            msg: `error occurred: ${error}`
        });
        }
        return res.json({
            success: true,
            msg: `Email sent successfully: ${info.response}`
        });
    });
})

router.post('/verifyotp', async (req, res) => {
    const { userId, otp } = req.body;
    const storedOtp = otpCache.get(userId);
    if (storedOtp === otp) {
        res.json({success:true,message:'OTP verified successfully'});
    } else {
        res.status(400).json({success:false,message:'Invalid OTP'});
    }
});

module.exports = router
