import React,{ useState} from 'react'
import { useNavigate } from 'react-router-dom';
import '../index.css'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import {actionCreator} from '../State/index'


const TaskItem = (props) => {
    let {taskName, imgSrc, text, bg, ol, btnRef, btnClass,alert, host, llm_host} = props;
    const [pdfFile, setPdfFile] = useState(null);
    const [loader,setLoader] = useState("")
    const [disable,setDisable] = useState(null)
    const navigate= useNavigate();
    const dispatch = useDispatch()
    // const type = useSelector(state => state.type)
    const actions = bindActionCreators(actionCreator, dispatch);

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
        setLoader("spinner-border spinner-border-sm me-2")
        setDisable(true)
        const ready = await checkUser(100)
        if(ready){
            if(localStorage.getItem("docster_msg")){
                localStorage.removeItem("docster_msg")
            }
            localStorage.setItem("docster_msg",JSON.stringify([{message:`Welcome to the ${btnRef} Chat System`}]))
    
            const formData = new FormData();
            formData.append('file', pdfFile);
    
            const response = await fetch(`${llm_host}/uploadfile/${btnRef}`, {
                method: "POST",
                body:formData
            })
            const ans = await response.json()
            setLoader("")
            setDisable(false)
            if(ans.success){
                actions.changeFile(btnRef, () => {
                    localStorage.setItem("docster_type",btnRef)
                    navigate(`/chat/${btnRef}`);
                })
                alert(ans.msg,'primary')
            }else{
                alert(ans.msg,'danger')
            }
        }else{
            setLoader("")
            setDisable(false)
            alert("Tokens Limit Reached: You can can ask for More Tokens","danger")
        }
        
    };
  return (
    <div className='my-3'>
        <div className={`card text-${text} bg-${bg} mb-3 mx-1`}>
                <img src={require(`../Assets/${imgSrc}`)} className="card-img-top" alt="altpdf"/>
                <div className="card-body">
                    <center><h5 className="card-title">{taskName}</h5>
                    <p style={{width:'80px',height:'2px',backgroundColor:'black'}}></p>
                    </center>
                    
                    <p className="card-text">
                        <strong>What I can do</strong>
                        <ul>
                            {ol.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </p>
                    <form encType='multipart/form-data' onSubmit={ submitDOC } className='form form-control-sm'>
                        <input type="file" name='file' accept={`.${btnRef}`} onChange={ handleDOCChange } />
                        <span className={loader} role="status" aria-hidden="true"></span>
                        <input type="submit" value="Submit" className={`btn btn-${btnClass} btn-sm`} disabled={disable} />
                    </form>
                </div>
            </div>
    </div>
  )
}

export default TaskItem
