import React,{useEffect, useRef, useState, useContext} from 'react'
import '../Chatstyle.css'
import ChatElement from './ChatElement';
import { useNavigate } from 'react-router';
import userContext from '../Context/userContext'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router';


const Chatbox = (props) => {
    const {showAlert, llm_host} = props.prop
    const context = useContext(userContext)
    const {updateToken, checkUser, aiques} = context
    const [comment, setComment] = useState("");
    const [chats, setChats] = useState([{message:"Welcome to the Chat System"}]);
    const navigate = useNavigate()
    const location = useLocation();
    const [loader,setLoader] = useState("")
    const [disable,setDisbale] = useState(false)
    const [btn,setBtn] = useState("Enter")
    let symbol = Number(0)
    const chatEndRef = useRef(null);
    const type = useSelector(state => state.type)
    const sid = useSelector(state => state.sid)

    useEffect(()=>{
      if(localStorage.getItem("Docschat_msg")){
        const getData = JSON.parse(localStorage.getItem("Docschat_msg"))
        if (Array.isArray(getData)) {
          setChats(getData);
        } else {
          console.error('Stored data is not an array:', getData);
        }
      }else{
        localStorage.setItem("Docschat_msg",JSON.stringify([{sid:sid,message:"Welcome to the Chat System"}]))
      }
      showAlert("Chat will remain here until you Logout","primary")
      // eslint-disable-next-line
    },[])

    useEffect(()=>{
      if(!localStorage.getItem('token')){
        navigate('/login')
      }
      if (chatEndRef.current) {
          chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
       // eslint-disable-next-line
    },[chats])

    
    const addtolocal =(msg)=>{
      if(localStorage.getItem("Docschat_msg")){
        const sData = JSON.parse(localStorage.getItem("Docschat_msg"));
        sData.push({message:msg})
        localStorage.setItem("Docschat_msg", JSON.stringify(sData));
      }else{
        localStorage.setItem("Docschat_msg",JSON.stringify([{message:msg}]))
      }
    }

    const getAIReply = async (query) =>{
      try{
        const reply = await fetch(`${llm_host}/chat/${type}/${sid}`,{
            method:'POST',
            headers: {
              "Content-Type": "application/json",
            }, 
            body: JSON.stringify({query:query})
        })
        if(reply.status === 200){
          const json = await reply.json()
          return json
        }else{
          return false
        }
      }catch(err){
        return false
      }
    }

    const AddComment = async(e) => {
      e.preventDefault();
      if(comment === ""){
        showAlert('Kindly Write Your Message First','danger')
      }else{
        setBtn("")
        setDisbale(true)
        setLoader("spinner-border spinner-border-sm me-2")
        const ready = await checkUser(100)
        if(ready){
          const currentChats = [...chats];
          if (comment !== "") {
          currentChats.push({
              message: comment,
          });
          addtolocal(comment)
          setChats(currentChats);
          setComment("");
          const aireply = await getAIReply(comment)
          if(aireply !== false){
            setChats([...currentChats,{message:aireply.result}])
            updateToken(aireply.cToken, aireply.gToken)
            setLoader("")
            setDisbale(false)
            setBtn("Enter")
            addtolocal(aireply.result)
          }else{
            setLoader("")
            setDisbale(false)
            setBtn("Enter")
            showAlert("There is some error, Try uploading file Again or Ask some other Question","danger")
          }
          }
        }else{
          setLoader("")
          setDisbale(false)
          setBtn("Enter")
          showAlert("Token Limits Reached: You can ask for More Tokens from drop down","danger")
        }
      }
    };
  return (
    <>
    <div className='container mx-10' style={{marginTop:'-50px'}}>
      <div style={{visibility:location.pathname ==="/chat/default/default"?"hidden":"visible"}}>
        <p className='text-muted'><strong>{type==='sql'?"":`keywords`}</strong> {aiques.result}</p>
      </div>
      <hr/>
      <div className="chatSection"style={{marginTop:'-1%'}}>
        {Object.keys(chats).length>0?chats.map((element,index) => {
            return (
              <>
                <div className="chatElement">
                  <ChatElement
                    id={index}
                    symbol={symbol++}
                    Chat={element.message}
                    alert={showAlert}
                  />
                </div>
              </>
            );
          }):""}
          <div ref={chatEndRef} />
      </div>
      <div className="center">
        <div>
        <textarea
          className="commentBox"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Enter your Message"
        />
        </div>
          <div>
          <button className="commentButton btn-sm" onClick={AddComment} disabled={disable}>
          <span className={loader} role="status" aria-hidden="true"></span>
          {btn}
          </button>
          </div>
      </div>
      </div>
    </>
  )
}

export default Chatbox
