import React, { useState, useContext } from 'react'
import '../Styling/forgot.css'
import { useMediaQuery } from 'react-responsive'
import { useNavigate} from 'react-router-dom'
import userContext from '../Context/userContext'


const Forgot = (props) => {
    const {host, showAlert} = props.prop
    const navigate = useNavigate()
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const [email, setEmail] = useState("")
    const [loader, setLoader] = useState("")
    const context = useContext(userContext)
    const {sendEmail, verifyEmail} = context
    const [otp, setOtp] = useState("")
    const [otptf, setOtptf] = useState("invisible")
    const [btname, setBtname] = useState("Submit")
    const [pass, setPass] = useState(true)
    const [newpass, setNewPass] = useState({pass:"",npass:""})
    const [disable, setDisable] = useState(false)


    const handleCancel =(e)=>{
        e.preventDefault()
        navigate('/login')
    }

    const handleSubmit =async (e)=>{
        e.preventDefault()
        setLoader("spinner-border spinner-border-sm m-2")
        setDisable(true)
        const check = await fetch(`${host}/api/auth/existuser`,{
            method:'POST',
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({email:email})
          })
          if(check.status === 500){
                showAlert('Some Error Occurred','danger')
                setLoader("")
                setDisable(false)
            }else{
                const checkr = await check.json()
                if(checkr.success){
                    const name = checkr.name
                    const id = checkr.id
                    localStorage.setItem('uid',id)
                    const reply = await sendEmail(name,email)
                    if(reply){
                        showAlert('Email Sent Succesfully','primary')
                        localStorage.setItem('fpid',reply.uid)
                        setOtptf("visible")
                        setLoader("")
                        setBtname("Verify OTP")
                    }else{
                        showAlert('Cannot send Email at this moment, Try again after some time','danger')
                        setLoader("")
                        setDisable(false)
                    }
                }else{
                    showAlert('This Email does NOT Exist in our Records','danger')
                    setLoader("")
                    setEmail("")
                    setDisable(false)
                }
            }
    }
    const verifyotp =async (e) =>{
        e.preventDefault()
        const otpid = localStorage.getItem('fpid')
        setLoader("spinner-border spinner-border-sm m-2")
        setDisable(true)
        const resp = await verifyEmail(otpid,otp)
        if(resp.success){
            showAlert('OTP verified Successully','success')
            setLoader("")
            setPass(false)
            setDisable(false)
            localStorage.removeItem('fpid')
        }else{
            showAlert('Invalid OTP, kindly Check','danger')
            setLoader("")
            setDisable(false)
        }
    }
    const passChange =(e)=>{
        setNewPass({...newpass,[e.target.name]:e.target.value})
    }

    const otpChange = (e)=>{
        otp.length <=4 ? setDisable(true):setDisable(false)
        setOtp(e.target.value)
    }
    const changePass = async (e)=>{
        e.preventDefault()
        if(newpass.pass !== newpass.npass){
            showAlert('Password and Confirm Password Does not Match','danger')
            setLoader("")
        }else{
            const uid = localStorage.getItem('uid')
            setLoader("spinned-border spinner-border-sm m-2")
            setDisable(true)
            const resp = await fetch(`${host}/api/auth/updatepass/${uid}`,{
                method:'PUT',
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify({npass:newpass.pass})
            })
            if(resp.status === 500){
                showAlert('Internal Server Error, kindly Try again','danger')
                setLoader("")
                setPass(true)
                setOtptf("invisible")
                setBtname("submit")
                setOtp("")
                setDisable(false)
                localStorage.removeItem('uid')
            }else{
                const reply = await resp.json()
                if(reply.success){
                    showAlert('Password Changed Successfully, kindly Login','success')
                    setLoader("")
                    setPass(true)
                    setOtptf("invisible")
                    setBtname("submit")
                    setOtp("")
                    setDisable(false)
                    navigate('/login')
                    localStorage.removeItem('uid')
                }else{
                    showAlert('Password was Not Changed, kindly submit again','danger')
                    setLoader("")
                    setDisable(false)
                }
            }
        }
    }

  return (
    <div className='container p-4' id='forgot' style={{marginTop:'-2%'}}>
      {pass ? <div className='box p-4' style={isTabletOrMobile?{width:"350px"}:{width:'500px'}}>
        <h2>Forgot Password</h2>
        <hr/>
      <form onSubmit={otp ===""?handleSubmit:verifyotp}>
        <div className="mb-3">
            <label for="exampleInputEmail1" class="form-label">Enter your Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Email' value={email} onChange={(e) =>setEmail(e.target.value)} required/>
        </div>
        <div className={`mb-3 ${otptf}`} >
            <input type="number" class="form-control" id="otp" aria-describedby="otpHelp" placeholder='Enter OTP' value={otp} onChange={otpChange}/>
        </div>
        <div className='mt-4 d-flex' id='btns'>
            <span className={loader}></span>
            <button type='cancel' className='btn btn-secondary mx-2 btn-sm' onClick={handleCancel}>Cancel</button>
            <button type="submit" className="btn btn-primary me-2 btn-sm" disabled={disable}>{btname}</button>
        </div>
        </form>
      </div> : 
      //create password div
      <div className='box p-4' style={isTabletOrMobile?{width:"350px"}:{width:'500px'}}>
      <h2>Create Password</h2>
      <hr/>
      <form onSubmit={changePass}>
        <div className="mb-3">
            <label for="password" class="form-label">New Password</label>
            <input type="password" class="form-control" aria-describedby="passhelp" placeholder='Create Password' name='pass' value={newpass.pass} onChange={passChange} required/>
        </div>
        <div className="mb-3">
            <label for="cpassword" class="form-label">Confirm Password</label>
            <input type="password" class="form-control" aria-describedby="passhelp" placeholder='Confirm Password' name='npass' value={newpass.npass} onChange={passChange} required/>
        </div>
        <div className='mt-4 d-flex' id='btns'>
            <span className={loader}></span>
            <button type="submit" className="btn btn-primary me-2 btn-sm" disabled={disable}>Submit</button>
        </div>
        </form>
      </div>}
    </div>
  )
}

export default Forgot
