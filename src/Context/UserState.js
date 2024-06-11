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

  return (
    <div>
      <UserContext.Provider value={{user, getUser, token, getToken, updateToken, checkUser}}>
            {props.children}
        </UserContext.Provider>
    </div>
  )
}

export default UserState
