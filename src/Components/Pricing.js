import React from 'react'
import '../Styling/pricing.css'
import { useNavigate} from 'react-router-dom'

const Pricing = () => {
  const navigate = useNavigate()
  const handleFree = ()=>{
    navigate('/')
  }
  return (
    <>
    <div className='container' id='pricing'>
      <div className='box p-4'>
        <h4 className='mt-2 fw-bold fs-6'>Free</h4>
        <h6 className='mt-2 fw-bold fs-5'>INR 0</h6>
        <hr/>
        <ul>
            <li>Free 5000 Tokens*</li>
            <li>No Document Limit</li>
            <li>No Chat Limit</li>
            <li>File size of 5000 words</li>
            <li>Less Accurate Answers</li>
        </ul>
        <center><button className='buy btn btn-warning' onClick={handleFree}>Get Started</button></center>
      </div>
      <div className='box p-4'>
        <h4 className='mt-2 fw-bold fs-6'>Pro</h4>
        <h6 className='mt-2 fw-bold fs-5'>INR 500</h6>
        <hr/>
        <ul>
            <li>4,00,000 Tokens</li>
            <li>No Document Limit</li>
            <li>No Chat Limit</li>
            <li>No File Size Limit</li>
            <li>More Accurate Answers using Agents</li>
        </ul>
        <center><button className='buy btn btn-warning' disabled>Coming Soon</button></center>
      </div>
    </div>
    <div className='container my-2'>
    <p className='text-muted fs-6 fw-light lh-sm'>*More Tokens can be taken by clicking <span className='text-decoration-underline'>Get More Tokens</span> from dropdown</p>
    <p className='lead'><strong>Disclaimer : </strong>As of Now No plans are added, all services are free</p>
    </div>
    </>
  )
}

export default Pricing
