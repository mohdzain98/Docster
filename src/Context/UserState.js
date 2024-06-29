import React,{useState} from 'react'
import UserContext from '../Context/userContext'

const UserState = (props) => {
    const {host}= props.host
    const [user,setUser] = useState("")
    const [token, setToken] = useState("")

    const getUser = async ()=>{
      const response = await fetch(`${host}/api/auth/getuser`, {
          method: "POST",
          headers: {
            "auth-token": localStorage.getItem('token')
          },
        });
  
        const json = await response.json();
        setUser(json.name)
        
    }
    const getToken = async () =>{
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
    }

    //updating token
    const updateToken = async (ct,gt)=>{
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
    }

    //checking user
    const checkUser = async (mt)=>{
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
    }
    
    const sendEmail = async (name,email) =>{
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
    }

    const verifyEmail = async (uid,otp) =>{
      const send = await fetch(`${host}/api/mail/verifyotp`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({userId:uid, otp:otp})
      })
      const reply = await send.json()
      return reply
    }

    const contact = async(subject,body, to) =>{
      const response = await fetch(`${host}/api/mail/contact`,{
        method:'POST',
        headers:{
          "Content-Type": "application/json"
        },
        body:JSON.stringify({subject:subject, body:body, to:to})
      })
      const reply = await response.json()
      return reply
    }

  return (
    <div>
      <UserContext.Provider value={{user, getUser, token, getToken, updateToken, checkUser, sendEmail, verifyEmail,contact}}>
            {props.children}
        </UserContext.Provider>
    </div>
  )
}

export default UserState
