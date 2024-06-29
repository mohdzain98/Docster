import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useGoogleLogin} from '@react-oauth/google';
import '../loginSignup.css';
import userContext from '../Context/userContext'
import emailpic from '../Assets/email.png'
import passpic from '../Assets/password.png'
import GoogleButton from 'react-google-button'
// import { useMediaQuery } from 'react-responsive'



const Login = (props) => {
  const [cred, setCred] = useState({email:"", password:""})
  const navigate = useNavigate()
  const [loader,setLoader] = useState("")
  const {host,showAlert, Logdout} = props.prop
  const context = useContext(userContext)
  const {getUser,getToken} = context
  const [gloader, setGLoader] = useState("");
  const [icon, setIcon] = useState("")

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
     // eslint-disable-next-line
  },[])
  const googleLogin = async (token) =>{
    const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    )
    const data = await response.json()
    const email = await data.email
    setGLoader("spinner-border spinner-border-sm me-2")
    const result = await fetch(`${host}/api/auth/glogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }, 
        body: JSON.stringify({email:email})
      });
      if(result.status === 500){
        showAlert("Internal Server Error Occurred","danger")
        setGLoader("")
      }else{
        const json = await result.json()
        if(json.success){
          //save the token and redirect
          setGLoader("")
          localStorage.setItem('token', json.authToken)
          navigate("/")
          showAlert("Login Sucessfully","success")
          getUser()
          getToken()
          Logdout()
        }else{
          showAlert(json.errors,"danger")
          setGLoader("")
        }
      }
    
  }
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      googleLogin(codeResponse.access_token)
    },
    onError: (error) => showAlert(`${error} - Kindly Login Manually`,'danger')
  });

  const handleSubmit = async (e)=>{
      e.preventDefault();
      setLoader("spinner-border spinner-border-sm me-2")
      // showAlert('This will take time as Server is running on free version','primary')
      const response = await fetch(`${host}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify({email: cred.email, password:cred.password})
        });
        if(response.status === 500){
          showAlert("Internal Server Error Occurred","danger")
          setLoader("")
        }else{
          const json = await response.json()
          if(json.success){
            //save the token and redirect
            setLoader("")
            localStorage.setItem('token', json.authToken)
            navigate("/")
            showAlert("Login Sucessfully","success")
            getUser()
            getToken()
            Logdout()
          }else{
            showAlert(json.errors,"danger")
            setLoader("")
          }
        }
  }
  
  const showPassword =()=>{
    if(icon === 'fa-eye-slash'){
      setIcon("fa-eye")
    }else{
      setIcon("fa-eye-slash")
    }
    let x = document.getElementById('password');
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
    }
  }
  const onChange = (e)=>{
    setIcon("fa-eye-slash")
    setCred({...cred, [e.target.name]:e.target.value})
  }
  return (
    <>
      <div className='container pb-3' id='ls' style={{marginTop:"-18px"}}>
        <div className='box'>
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
          <p>Don't have an account <Link to={'/signup'}>Signup</Link></p>
        </div>
        <form onSubmit={handleSubmit}>
        <div className='inputs'>
          <div className="input">
              <img src={emailpic} alt='email'/>
              <input type="email" id="email" name='email' value={cred.email} onChange={onChange} placeholder='Email' required/>
          </div>
          <div className="input">
          <img src={passpic} alt='password'/>
              <input type="password" id="password" name='password' value={cred.password} onChange={onChange} placeholder='Password' required/>
              <i className={`fa-solid ${icon} fa-sm mx-2`} onClick={showPassword} style={{cursor:'pointer'}}></i>
          </div>
          </div> 
          <p className='mt-2 mb-4' style={{marginLeft:'35px'}}><Link to='/forgot-password' >forgot passsword?</Link></p>
          <div className="submit-container mt-4">
          <button className="submit" type="submit">
            <span className={loader} role="status" aria-hidden="true"></span>
            Login
          </button>
          </div>
          <center><p>OR</p></center>
          <hr/>
          <center>
          <GoogleButton
            type='light'
            onClick={login}
            
          />
          <span className={gloader} role="status" aria-hidden="true"></span>
          </center>
          <br/>
        </form>
        <center><p style={{fontSize:'12px'}}>By logging in you agree to our <Link to='/in/terms'>Terms of Service</Link></p></center>
        </div>

          
        
    </div>
    </>
  )
}

export default Login
