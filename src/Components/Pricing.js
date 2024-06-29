import React from 'react'
import '../Styling/pricing.css'

const Pricing = () => {
  return (
    <>
    <div className='container' id='pricing'>
      <div className='box p-4'>
        <h4 className='mt-2 fw-bold fs-6'>Free</h4>
        <h6 className='mt-2 fw-bold fs-5'>INR 0</h6>
        <hr/>
        <ul>
            <li>Free 5000 Tokens*</li>
            <li>Free Storage </li>
            <li>No Document Limit</li>
            <li>No Chat Limit</li>
            <li>No Card Required</li>
        </ul>
        <p className='text-muted fs-6 fw-light lh-sm'>*More Tokens can be taken by clicking <span className='text-decoration-underline'>Get More Tokens</span> from dropdown</p>
      </div>
    </div>
    <div className='container my-2'>
    <p className='lead'><strong>Disclaimer : </strong>As of Now No plans are added, all services are free</p>
    </div>
    </>
  )
}

export default Pricing
