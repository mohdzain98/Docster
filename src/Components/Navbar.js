import React, { useEffect, useRef, useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import userContext from '../Context/userContext'
import { useMediaQuery } from 'react-responsive'
import { useDispatch } from 'react-redux'
import { changeFile, setSID } from '../State/action-creator'
import { Link as ScrollLink } from 'react-scroll';

const Navbar = (props) => {
    const {host,Logdin,showAlert} = props.prop
    const navigate = useNavigate()
    const context = useContext(userContext)
    const {user,getUser, token, getToken, contact} = context
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    let ref = useRef(null)
    let modalRef = useRef(null)
    let modalClose= useRef(null)
    const [loader,setLoader] = useState("")
    const [mail, setMail] = useState({email:"", text:""})
    const dispatch = useDispatch()
    let location = useLocation();
    const to = process.env.REACT_APP_TO

    
    const handleLogout =()=>{
        localStorage.removeItem('token')
        localStorage.removeItem('Docschat_type')
        localStorage.removeItem('Docschat_msg')
        localStorage.removeItem('Docschat_sid')
        dispatch(changeFile("default",()=>{}))
        dispatch(setSID("default",()=>{}))
        navigate("/")
        showAlert('Logged Out','primary')
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
        return result
      }
    const modalClick = async() =>{
        if(mail.email ==="" || mail.text === ""){
            showAlert('Kindly Fill all fields','danger')
        }else{
            setLoader("spinner-border spinner-border-sm")
            const result = await addMoreTokens(mail.email,mail.text)
            if(result.success){
                const body=`<strong>email: </strong>:${mail.email}
                <p>${mail.text}</p>
                `
                const send = await contact("More Tokens Request",body, to)
                if(send.success){
                    showAlert('Message sent successfully','primary')
                    setMail({email:"",text:""})
                }else{
                    showAlert('There is an error sending Message','danger')
                    setMail({email:"",text:""})
                }
            }else{
                showAlert(result.errors,"danger")
            }
            setLoader("")
            modalClose.current.click()
        }
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
                <div className="modal-dialog modal-dialog-centered">
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
                                <textarea className="form-control" id="text" name='text' value={mail.text} onChange={onChange}/>
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
                <Link className="navbar-brand" to="/">Docschat</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" ref={ref}>
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {location.pathname === "/"?
                            <li class="nav-item dropdown">
                                {/* <Link className={`nav-link dropdown-toggle ${location.pathname === "/"?"active":""}`} id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" >Home</Link> */}

                                <a class={`nav-link dropdown-toggle ${location.pathname === "/"?"active":""}`} href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Home
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><ScrollLink className='dropdown-item' to='task' smooth={true} duration={50} onClick={rollNavBack} style={{cursor:'pointer'}}>
                                    Documents
                                </ScrollLink></li>
                                <li><ScrollLink className='dropdown-item' to='tool' smooth={true} duration={50} onClick={rollNavBack} style={{cursor:'pointer'}}>
                                    Tools
                                </ScrollLink></li>
                                </ul>
                            </li>
                            :
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/"?"active":""}`} aria-current="page" to="/" onClick={rollNavBack}>Home</Link>
                            </li>
                        }
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/about"?"active":""}`} aria-current="page" to="/about" onClick={rollNavBack}>About</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/product" || location.pathname === '/product/surfmind'?"active":""}`} aria-current="page" to="/product" onClick={rollNavBack}>Product</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/pricing"?"active":""}`} aria-current="page" to="/pricing" onClick={rollNavBack}>Pricing</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/contactus"?"active":""}`} aria-current="page" to="/contactus" onClick={rollNavBack}>Contact Us</Link>
                        </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${location.pathname === "/faq"?"active":""}`} aria-current="page" to='/faq' onClick={rollNavBack}>FAQ</Link>
                        </li>
                        
                    </ul>
                    {( !localStorage.getItem('token')) ?<form className='d-flex'>
                    <Link style={{display: `${location.pathname === '/' || location.pathname === '/login' ?"none":"initial"}`}} className='btn btn-primary btn-sm mx-1' role='button' to="/login" onClick={rollNavBack}>Login</Link>
                    <Link style={{display: `${location.pathname === '/' || location.pathname === '/signup' ?"none":"initial"}`}} className='btn btn-primary btn-sm mx-1' role='button' to='/signup' onClick={rollNavBack}>Signup</Link>
                    </form>:
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
