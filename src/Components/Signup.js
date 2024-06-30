import React, { useState, useContext, useEffect, useRef } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useGoogleLogin} from '@react-oauth/google';
import '../loginSignup.css';
import userContext from '../Context/userContext'
import emailpic from '../Assets/email.png'
import passpic from '../Assets/password.png'
import person from '../Assets/person.png'
import GoogleButton from 'react-google-button'
import mail from '../mails'


const Signup = (props) => {
  const [cred, setCred] = useState({name:"", email:"", password:"", cpassword:""})
    const navigate = useNavigate()
    const context = useContext(userContext)
    const {getUser, getToken, sendEmail, verifyEmail, contact} = context
    const {host,showAlert, Logdout} = props.prop
    const [loader,setLoader] = useState("")
    const [mloader, setMloader] = useState("")
    const otpModal = useRef(null)
    const modalClose = useRef(null)
    const [otp, setOtp] = useState("")
    const [valid, setValid] = useState("invisible")
    const [resendbtn, setResendbtn] = useState({val:true,color:'black'})
    const [cdown, setCdown] = useState(60)

    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/')
      }
       // eslint-disable-next-line
    },[])

    const googleSignup = async (token) =>{
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      )
      const data = await response.json()
      handleSubmit(data.name, data.email, data.id, data.id)
    }

    const onChangeModal = (e)=>{
        setOtp(e.target.value)
    }
    const otpResend =async ()=>{
      const {name, email} = cred
      setCdown(60)
      setResendbtn({val:true,color:'black'})
      const reply = await sendEmail(name,email)
          if(reply.success){
            localStorage.setItem('otpID',reply.uid)
            let timeLeft = 60; // 60 seconds
            const countdown = setInterval(() => {
              timeLeft--;
              setCdown(timeLeft)
              if (timeLeft <= 0) {
                clearInterval(countdown);
                setResendbtn({val:false,color:'blue'})
              }
            }, 1000); // 1000 milliseconds = 1 second

          }else{
            showAlert('Error Sending OTP, Try after some time','danger')
          }
    }

    const verifyUser = async (e) =>{
      e.preventDefault()
      setLoader("spinner-border spinner-border-sm")
      const {name, email,password, cpassword} = cred
      if(password !== cpassword){
        showAlert("Password and Confirm password does not match",'danger')
        setLoader("")
      }else{
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
        }else{
          const checkr = await check.json()
          if(checkr.success){
            showAlert('Email Already exist kindly Login','primary')
            setLoader("")
          }else{
            const reply = await sendEmail(name,email)
            if(reply.success){
              localStorage.setItem('otpID',reply.uid)
              otpModal.current.click()
              let timeLeft = 60; // 60 seconds
              const countdown = setInterval(() => {
                timeLeft--;
                setCdown(timeLeft)
                if (timeLeft <= 0) {
                  clearInterval(countdown);
                  setResendbtn({val:false,color:'blue'})
                }
              }, 1000); // 1000 milliseconds = 1 second

            }else{
              showAlert('Error Sending OTP, Try after some time','danger')
              setLoader("")
            }
          }
        }
      }
    }

    const handleVer =async ()=>{
      const uid= localStorage.getItem('otpID')
      setMloader("spinner-border spinner-border-sm")
      const resp = await verifyEmail(uid,otp)
      if(resp.success){
        modalClose.current.click()
        showAlert('OTP verified Successully','primary')
        handleSubmit(cred.name, cred.email, cred.password, cred.cpassword)
        setMloader("")
      }else{
        setValid('visible')
        setTimeout(() => {
          setValid("invisible")
        }, "2000")
        setMloader("")
      }
    }

    const signup = useGoogleLogin({
      onSuccess: (codeResponse) => {
        googleSignup(codeResponse.access_token)
      },
      onError: (error) => showAlert(`${error} - Kindly Signup Manually`,'danger')
    });

    const handleSubmit = async (name,email,password,cpassword)=>{
        // const {name, email,password, cpassword} = cred
        if(password === cpassword){
        setLoader("spinner-border spinner-border-sm")
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({name: name,email:email, password:password})
          });
          if(response.status === 500){
            showAlert("Internal Server Error Occurred","danger")
            setLoader("")
            setCred({name:"", email:"", password:"", cpassword:""})
          }else{
            const json = await response.json()
            if(json.success){
              //save the token and redirect
              setLoader("")
              localStorage.setItem('token', json.authToken)
              navigate("/")
              showAlert("Account Created Successfully","success")
              getUser()
              getToken()
              Logdout()
              await contact("Welcome to Docschat",mail.welcome,email)
            }else{
              showAlert("Account Already Exist, Kindly Login","danger")
              setLoader("")
              setCred({name:"", email:"", password:"", cpassword:""})
            }
          }
        }
        else{
          showAlert("Password and Confirm Password does not match",'danger')
          setLoader("")
        }
    }
    const onChange = (e)=>{
      setCred({...cred, [e.target.name]:e.target.value})
    }
    const showPassword =()=>{
      let x = document.getElementById('password');
      let y = document.getElementById('cpassword')
      if (x.type && y.type === "password") {
        x.type = "text";
        y.type = "text"
      } else {
        x.type = "password";
        y.type = "password"
      }
    }
  return (
    <>
      <div className='container' id='su' style={{marginTop:"-15px"}}>
        <div className="header mb-4">
          <div className="text">Signup</div>
          <div className="underline"></div>
          <p>Already have an account, kindly <Link to={'/login'}>Login</Link></p>
          <div className={loader} role="status"><span className="visually-hidden">Loading...</span></div>
        </div>
        <div className='box pb-3'>
        <form onSubmit={verifyUser}>
        <div className='inputs'>
        <div className="input">
              <img src={person} alt='email'/>
              <input type="text" id="name" name='name' value={cred.name} onChange={onChange} placeholder='Name' required/>
          </div>
          <div className="input">
              <img src={emailpic} alt='email'/>
              <input type="email" id="email" name='email' value={cred.email} onChange={onChange} placeholder='Email' required/>
          </div>
          <div className="input">
          <img src={passpic} alt='password'/>
              <input type="password" id="password" name='password' value={cred.password} onChange={onChange} placeholder='Password' minLength={8} required/>
          </div>
          <div className="input">
            <img src={passpic} alt='password'/>
            <input type="password" placeholder='Confirm Password' id="cpassword" name='cpassword' onChange={onChange} value={cred.cpassword} minLength={8} required/>
          </div>
          </div> 
          <input className="me-1 my-3 ms-5" type="checkbox" onClick={showPassword}/>Show Password
          <div className="submit-container">
          <button className="submit" type="submit">
            Signup
          </button>
          </div>
        </form>
        </div>
        <div className='gs mt-4' style={{marginBottom: '5px'}}>
          <center><h4>OR</h4></center>
          <hr/>
          <GoogleButton
                  label='Sign Up With Google'
                  type='dark'
                  onClick={signup}
                />
        
          <button type="button" className="btn btn-primary invisible" data-bs-toggle="modal" data-bs-target="#otpModal" ref={otpModal}>
            Launch demo modal
          </button>

          <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="otpModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Kindly Verify Your Email: </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="mb-3">
                        <label htmlFor="otp" className="form-label">Enter OTP</label>
                        <input type="number" className="form-control" id="otp" value={otp} name='otp' placeholder='OTP' onChange={onChangeModal}/>
                    </div>
                  </form>
                  <p className={valid} style={{color:'red'}}>Invalid OTP, check again</p>
                </div>
                <div className="modal-footer">
                <button type="button" disabled={resendbtn.val} style={{padding: '0',border: 'none', background: 'none', color:resendbtn.color}} onClick={otpResend}>{`Resend OTP in ${cdown}`}</button>
                  <span className={mloader}></span>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={modalClose}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleVer}>Verify</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <center><p className='mt-2 mb-4' style={{fontSize:'12px'}}>By clicking Signup, you agree to our <Link to='/in/terms'>Terms</Link> and <Link to='/privacy-policy'>Privacy Policy</Link></p></center>
    </div>
    </>
  )
}

export default Signup
