import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import '../loginSignup.css';
import userContext from '../Context/userContext'
import emailpic from '../Assets/email.png'
import passpic from '../Assets/password.png'
// import { useMediaQuery } from 'react-responsive'



const Login = (props) => {
  const [cred, setCred] = useState({email:"", password:""})
  const navigate = useNavigate()
  const [loader,setLoader] = useState("")
  const {host,showAlert, Logdout} = props.prop
  const context = useContext(userContext)
  const {getUser,getToken} = context
  console.log('atLogin',host)

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
     // eslint-disable-next-line
  },[])

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
          showAlert("Invalid Credential, If you are new Kindly Signup","danger")
          setLoader("")
        }
  }
  
  const showPassword =()=>{
    let x = document.getElementById('password');
      if (x.type === "password") {
        x.type = "text";
      } else {
        x.type = "password";
    }
  }
  const onChange = (e)=>{
    setCred({...cred, [e.target.name]:e.target.value})
  }
  return (
    <>
      <div className='container' id='ls' style={{marginTop:"30px"}}>
        <div className='box'>
        <div className="header">
          <div className="text">Login</div>
          <div className="underline"></div>
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
          </div>
          </div> 
          <input className="me-1 my-3 ms-4" type="checkbox" onClick={showPassword}/>Show Password
          <div className="submit-container">
          <button className="submit" type="submit">
            <span className={loader} role="status" aria-hidden="true"></span>
            Login
          </button>
          
          </div>
          <center><p>If you are new kindly <Link to={'/signup'}>Signup</Link></p></center>
        </form>
        
        </div>
        
    </div>
    </>
  )
}

export default Login
