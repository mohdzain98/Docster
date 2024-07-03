import React from 'react'
import { Link } from 'react-router-dom'
import '../Styling/footer.css'

const Footer = () => {
  return (
    <>
    <div className='text-black pt-4' style={{background:'#e0e0e0'}}>
        <div className='container'>
            <div className='row'>
                <div>
                    <ul className="list-inline">
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/about'} style={{textDecoration:'none', color:'black'}}>About</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/privacy-policy'} style={{textDecoration:'none', color:'black'}}>Privacy Policy</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/pricing'} style={{textDecoration:'none', color:'black'}}>Pricing</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/contactus'} style={{textDecoration:'none', color:'black'}}>Feedback</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/contactus'} style={{textDecoration:'none', color:'black'}}>Report an Issue</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/faq'} style={{textDecoration:'none', color:'black'}}>FAQs</Link></button></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className='text-white bg-dark pt-3'>
        <div className="container" id='copy'>
            <div>
                <p className='text-center' > &copy; 2024 Docschat</p>
            </div>
            <div>
                <p className='text-center'>Updated on : 03 July, 2024  V: 1.4</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer
