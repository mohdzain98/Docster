import React,{ useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import '../index.css'
import { useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid';
import userContext from '../Context/userContext'
import { changeFile, setSID } from "../State/action-creator";


const TaskItem = (props) => {
    let {taskName, imgSrc, ol, btnRef,alert, host, llm_host, type} = props;
    const [pdfFile, setPdfFile] = useState(null);
    const [loader,setLoader] = useState("")
    const [disable,setDisable] = useState(null)
    const navigate= useNavigate();
    const dispatch = useDispatch()
    const [status, setStatus] = useState(0)
    const [bar, setBar] = useState("invisible")
    const context = useContext(userContext)
    const {getaiques} = context


    const handleDOCChange = (event) => {
        setPdfFile(event.target.files[0]);
    }

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

    const submitDOC = async (event) => {
        event.preventDefault();
        const Sid = uuidv4()
        setBar("visible")
        setStatus(10)
        if(!localStorage.getItem('token')){
            navigate('/login')
            alert("Kindly Login First","primary")
        }else{
            setStatus(50)
            if(pdfFile === null){
                alert("kindly select file","danger")
            }else if(pdfFile.type !== type){
                alert("Kindly Select Appropriate File","danger")
            }else{  
                setLoader("spinner-border spinner-border-sm me-2")
                setDisable(true)
                const ready = await checkUser(100)
                if(ready){
                    if(localStorage.getItem("Docschat_msg")){
                        localStorage.removeItem("Docschat_msg")
                    }
                    localStorage.setItem("Docschat_msg",JSON.stringify([{sid:Sid, message:`I am ready with your  ${btnRef} file `}]))
            
                    const formData = new FormData();
                    formData.append('file', pdfFile);
                    const response = await fetch(`${llm_host}/uploadfile/${btnRef}/${Sid}`, {
                        method: "POST",
                        body:formData
                    })
                    if(response.status === 200){
                        setStatus(70)
                        const ans = await response.json()
                        setLoader("")
                        setDisable(false)
                        if(ans.success){
                            dispatch(setSID(Sid,()=>{
                                localStorage.setItem("Docschat_sid", Sid);
                                if(btnRef !== 'sql'){
                                    getaiques(Sid)
                                }
                            }));
                            dispatch(changeFile(btnRef, () => { 
                                localStorage.setItem("Docschat_type", btnRef);
                                navigate(`/chat/${btnRef}/${Sid}`);
                            }));
                            alert(ans.msg,'primary')
                        }else{
                            alert(ans.msg,'danger')
                        }
                    }else{
                        setLoader("")
                        setDisable(false)
                        alert('Internal Server Error Occurred','danger')
                    }
                }else{
                    setLoader("")
                    setDisable(false)
                    alert("Tokens Limit Reached: You can can ask for More Tokens","danger")
                }
            }
        }
        setStatus("")
        setBar("invisible")
    };
  return (
    <div className='my-3 pt-4' id='task'>
            <div className='box'>
                <div className='row'>
                    <div className='image-container'>
                    <img src={require(`../Assets/${imgSrc}`)}  alt="altpdf" />
                    </div>
                    <div class='data'>
                        <h4 style={{textShadow:'0px 4px 4px #000000'}}>{taskName}</h4>
                        <p style={{width:'150px',height:'2px',backgroundColor:'black'}}></p>
                        <p className='define'>Upload and Chat With AI</p>
                    </div>
                </div>
                <div className='footer'>
                <p className="text-muted">
                                <ul style={{fontSize:'14px'}}>
                                    {ol.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </p>
                    <form encType='multipart/form-data' onSubmit={ submitDOC } className='form form-control-sm'>
                        <input type="file" name='file' accept={`.${btnRef}`} onChange={ handleDOCChange } className='btn small'/>
                        <span className={loader} role="status" aria-hidden="true"></span>
                        <button type="submit" className={`btn btn-outline-dark`} disabled={disable} style={{float:'right', width:'50px',height:'27px'}}>
                                <i className="fa-solid fa-arrow-right"></i>
                            </button>         
                    </form>
                </div>
                <div class={`progress my-2 mx-4 ${bar}`}>
                <div class="progress-bar" role="progressbar" style={{width: `${status}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{status}%</div>
                </div>
            </div>
    </div>
  )
}

export default TaskItem
