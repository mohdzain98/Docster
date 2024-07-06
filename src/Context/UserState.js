import React,{useState} from 'react'
import UserContext from '../Context/userContext'

const UserState = (props) => {
    const {host,llm_host,showAlert}= props.host
    const [user,setUser] = useState("")
    const [token, setToken] = useState("")
    const [aiques, setAiques] = useState("")

    const getUser = async ()=>{
      try{
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "POST",
            headers: {
              "auth-token": localStorage.getItem('token')
            },
          });
    
          const json = await response.json();
          setUser(json.name)
        
      }catch(err){
        showAlert('There is Error at Accessing Server','danger')
      }
    }
    const getToken = async () =>{
      try{
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });

        const json = await response.json();
        let tokenVal=[]
        tokenVal[0] = json.currentToken.cToken.low
        tokenVal[1] = json.currentToken.gToken.low 
        tokenVal[2] = json.maxToken.low
        setToken(tokenVal)
      }catch(err){
        showAlert('There is Error at Accessing Server','danger')
      }
    }

    //updating token
    const updateToken = async (ct,gt)=>{
      try{
        const response = await fetch(`${host}/api/auth//updatect/`,{
          method:'PUT',
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({ct,gt})
        })
        const json = await response.json();
        let tokenVal=[]
        tokenVal[0] = json.currentToken.cToken.low
        tokenVal[1] = json.currentToken.gToken.low 
        tokenVal[2] = json.maxToken.low
        setToken(tokenVal)
      }catch(err){
        showAlert('There is Error at Accessing Server','danger')
      }
    }

    //checking user
    const checkUser = async (mt)=>{
      try{
        const valid = await fetch(`${host}/api/auth/checkuser`,{
            method:'POST',
            headers:{
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({moreTokens:mt})
        })
        if(valid.status === 401){
          return false
        }else{
          const json = await valid.json() 
          if(json.ready){
            return true
          }else{
            return false
          }
        }
      }catch(err){
        showAlert('There is Error at Accessing Server','danger')
      }
    }
    
    const sendEmail = async (name,email) =>{
      try{
        const send = await fetch(`${host}/api/mail/sendmail`,{
          method:'POST',
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({email:email, name:name})
        })
        if(send.status === 200){
          const reply = await send.json()
          return reply
        }else{
          return {msg:"Email was not sent",uid:null}
        }
      }catch(err){
        showAlert('There is Error Accessing Server','danger')
      }
    }

    const verifyEmail = async (uid,otp) =>{
      try{
        const send = await fetch(`${host}/api/mail/verifyotp`,{
          method:'POST',
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({userId:uid, otp:otp})
        })
        const reply = await send.json()
        return reply
      }catch(err){
        showAlert('There is Error Accessing Server','danger')
      }
    }

    const contact = async(subject,body, to) =>{
      try{
        const response = await fetch(`${host}/api/mail/contact`,{
          method:'POST',
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({subject:subject, body:body, to:to})
        })
        const reply = await response.json()
        return reply
      }catch(err){
        showAlert('There is Error Accessing Server','danger')
      }
    }

    const getaiques = async(sid)=>{
      try{
        const response = await fetch(`${llm_host}/getques/${sid}`,{
          method:'GET'
        })
        const reply = await response.json()
        setAiques(reply)
      }catch(err){
        setAiques(err)
      }
    }

  return (
    <div>
      <UserContext.Provider value={{user, getUser, token, getToken, updateToken, checkUser, sendEmail, verifyEmail,contact, aiques, getaiques}}>
            {props.children}
        </UserContext.Provider>
    </div>
  )
}

export default UserState
