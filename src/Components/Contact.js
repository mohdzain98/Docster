import React, { useState, useContext } from 'react'
import '../Styling/contactus.css'
import userContext from '../Context/userContext'
import { useMediaQuery } from 'react-responsive'


const Contact = (props) => {
    const {showAlert} = props.prop
    const [issue, setIssue] = useState({email:"",text:""})
    const [fb, setFb] = useState({email:"",text:""})
    const context = useContext(userContext)
    const {contact} = context
    const [disable, setDisable] = useState(false)
    const [floader, setFloader]= useState("")
    const [iloader,setIloader] = useState("")
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const to = process.env.REACT_APP_TO
    console.log(to)

    const issueChange = (e)=>{
        setIssue({...issue, [e.target.name]:e.target.value})
        console.log(issue)
    }
    const fbChange = (e)=>{
        setFb({...fb, [e.target.name]:e.target.value})
        console.log(fb)
    }

    const handleIssue =async (e)=>{
        e.preventDefault()
        setIloader("spinner-border spinner-border-sm mx-2")
        setDisable(true)
        const body=`<strong>email</strong>:${issue.email}
            <p>${issue.text}</p>
              `
        const send = await contact("An issue is Raised",body, to)
        if(send.success){
            console.log('send',send)
            showAlert('Message sent successfully','primary')
            setIssue({email:"",text:""})
        }else{
            showAlert('There is an error sending Message','danger')
            setIssue({email:"",text:""})
        }
        setDisable(false)
        setIloader("")
    }
    const handleFeedback =async (e)=>{
        e.preventDefault()
        setFloader("spinner-border spinner-border-sm mx-2")
        setDisable(true)
        const body=`<strong>email</strong>:${fb.email}
            <p>${fb.text}</p>
              `
        const send = await contact("You got a Feedback",body,to)
        if(send.success){
            showAlert('Message sent successfully','primary')
            setFb({email:"",text:""})
        }else{
            showAlert('There is an error sending Message','danger')
            setFb({email:"",text:""})
        }
        setDisable(false)
        setFloader("")
    }
  return (
    <>
    <div className='contaier mx-3' id='contact' style={isTabletOrMobile?{marginTop:'-10%'}:{}}>
        <div className='box p-4'>
            <center><h4 className='mt-2'>Feedback</h4></center>
            <hr className="hr hr-blur" style={{backgroundColor:'#808080', height:'1px'}}></hr>
            <form onSubmit={handleFeedback}>
            <div className="mb-3">
                <label htmlFor="feedbackissue" className="form-label">Email address</label>
                <input type="email" className="form-control" id="feedbackissue" aria-describedby="emailHelp" name='email' value={fb.email} onChange={fbChange} required/>
                <div id="emailHelp" className="form-text">We take email so that we can respond .</div>
            </div>
            <div className="mb-3">
                <label htmlFor="text" className="form-label">Message</label>
                <textarea type="text" className="form-control" id='msg' name='text' value={fb.text} onChange={fbChange} required></textarea>
            </div>
            <button type="submit" className="btn" disabled={disable}>Submit Feedback <span className={floader}></span></button>
            </form>
        </div>
        <div className='box p-4'>
            <center><h4 className='mt-2'>Report an Issue</h4></center>
            <hr className="hr hr-blur" style={{backgroundColor:'#808080', height:'1px'}}></hr>
            <form onSubmit={handleIssue}>
            <div className="mb-3">
                <label htmlFor="issueemail" className="form-label">Email address</label>
                <input type="email" className="form-control" id="issueemail" aria-describedby="emailHelp" name='email' value={issue.email} onChange={issueChange} required/>
                <div id="emailHelp" className="form-text">We take email so that we can respond .</div>
            </div>
            <div className="mb-3">
                <label htmlFor="text" className="form-label">Message</label>
                <textarea type="text" className="form-control" id='msg' name='text' value={issue.text} onChange={issueChange} required></textarea>
            </div>
            <button type="submit" className="btn" disabled={disable}>Submit Issue <span className={iloader}></span></button>
            </form>
        </div>
      
    </div>
    <div className=' container my-4'>
        <h4>For any other query kindly contact at:</h4>
        <hr/>
        <p className='lead'>
        <label>Email:</label>
        <mark>
        <a href='mailto:support@docschat.in' style={{textDecoration:'none',color:'black'}}>support@docschat.in</a>
        </mark>
        </p>
    </div>
    </>
  )
}

export default Contact
