import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import '../loginSignup.css';
import userContext from '../Context/userContext'
import emailpic from '../Assets/email.png'
import passpic from '../Assets/password.png'
import person from '../Assets/person.png'


const Signup = (props) => {
  const [cred, setCred] = useState({name:"", email:"", password:"", cpassword:""})
    const navigate = useNavigate()
    const context = useContext(userContext)
    const {getUser, getToken} = context
    const {host,showAlert, Logdout} = props.prop
    const [loader,setLoader] = useState("")

    useEffect(()=>{
      if(localStorage.getItem('token')){
        navigate('/')
      }
       // eslint-disable-next-line
    },[])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const {name, email,password, cpassword} = cred
        if(password === cpassword){
        setLoader("spinner-border spinner-border-sm")
        // showAlert('This will take time as Server is running on free version','primary')
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({name: name,email:email, password:password})
          });
          if(response.status === 200){
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
            }else{
              showAlert("Something is Wrong: Either account already exist or There is an error","danger")
              setLoader("")
            }
          }else{
            showAlert("Internal Server Eroor Occurred","danger")
            setLoader("")
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
      <div className='container' id='ls' style={{marginTop:"30px"}}>
        <div className='box'>
        <div className="header">
          <div className="text">Signup</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
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
              <input type="password" id="password" name='password' value={cred.password} onChange={onChange} placeholder='Password' required/>
          </div>
          <div className="input">
            <img src={passpic} alt='password'/>
            <input type="password" placeholder='Confirm Password' id="cpassword" name='cpassword' onChange={onChange} value={cred.cpassword} minLength={5} required/>
          </div>
          </div> 
          <input className="me-1 my-3 ms-4" type="checkbox" onClick={showPassword}/>Show Password
          <div className="submit-container">
          <button className="submit" type="submit">
            <span className={loader} role="status" aria-hidden="true"></span>
            Signup
          </button>
          
          </div>
          <center><p>If Account Already Exist Kindly <Link to={'/login'}>Login</Link></p></center>
        </form>
        
        </div>
        
    </div>
    </>
  )
}

export default Signup
