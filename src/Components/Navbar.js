import React, { useEffect, useRef, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Context/userContext'
import { useMediaQuery } from 'react-responsive'
import { useDispatch } from 'react-redux'
import { changeFile, setSID } from '../State/action-creator'

const Navbar = (props) => {
    const {host,Logdin,showAlert} = props.prop
    const navigate = useNavigate()
    const context = useContext(userContext)
    const {user,getUser, token, getToken} = context
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    let ref = useRef(null)
    let modalRef = useRef(null)
    let modalClose= useRef(null)
    const [loader,setLoader] = useState("")
    const [mail, setMail] = useState({email:"", text:""})
    const dispatch = useDispatch()
    
    const handleLogout =()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('Docschat_type')
        localStorage.removeItem('Docschat_msg')
        localStorage.removeItem('Docschat_sid')
        dispatch(changeFile("default",()=>{}))
        dispatch(setSID("default",()=>{}))
        navigate("/")
        rollNavBack()
        Logdin()
    }
    const onChange = (e)=>{
        setMail({...mail, [e.target.name]:e.target.value})
    }
    const addMoreTokens = async (email,text)=>{
        const response = await fetch(`${host}/api/moretokens/getmore`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({email,text}),
        });
        const result = await response.json()
        if(result.success){
          showAlert("Request Added Successfully","primary")
        }else{
          showAlert(result.errors,"danger")
        }
      }
    const modalClick = async() =>{
        setLoader("spinner-border spinner-border-sm")
        await addMoreTokens(mail.email,mail.text)
        setLoader("")
        modalClose.current.click()
    }
    const getMoreToken =() =>{
        modalRef.current.click()
    }
    const rollNavBack =()=>{
        isTabletOrMobile && ref.current.click()
    }
        

    useEffect(()=>{
        localStorage.getItem('token') && getUser() && getToken()
        // eslint-disable-next-line
    },[])

    return (
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={modalRef}>
            Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Send us a Message to Get More Token</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className='modal-body'>
                    <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" value={mail.email}name='email' placeholder='Email' onChange={onChange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Message</label>
                        <textarea className="form-control" id="text" name='text' value={mail.text} onChange={onChange} />
                    </div>
                    </form>
                <span className={loader} role="status" aria-hidden="true"></span>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={modalClose}>Close</button>
                    <button type="button" className="btn btn-info" onClick={modalClick}>Send</button>
                </div>
                </div>
            </div>
            </div>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <Link className="navbar-brand" to="/">
                <img src="favicon-32x32.png" alt="" width="30" height="30"/>
                </Link>
                <Link className="navbar-brand" to="/">Docschat</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" ref={ref}>
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                    {( !localStorage.getItem('token')) ?"":
                        <div className="btn-group">
                            <button type="button" className="btn btn-secondary dropdown-toggle mx-2 me-2" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                            <i className="fa-solid fa-user me-2" style={{color: "#FFD43B"}}></i>{user}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-lg-end">
                            <li className='mx-2'><small>Context Token: {token[0]}</small></li>
                            <li className='mx-2'><small>Generated Token: {token[1]}</small></li>
                            <li className='mx-2' style={{color: (token[2]-(token[0]+token[1]))<500?"red":""}}><small>Total Used: {token[0]+token[1]}</small></li>
                            <li className='mx-2'><small>Free Token: {token[2]}</small></li>
                            <li><center><button className="btn btn-outline-danger btn-sm my-2" onClick={handleLogout} type="button">Logout</button></center></li>
                            <li><center><button className="btn btn-warning btn-sm mb-2" onClick={getMoreToken} type='button'>
                                Get More Token</button></center></li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            
        </nav>
        </>
    )
}
export default Navbar;
