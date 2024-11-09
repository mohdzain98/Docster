import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../Styling/footer.css'

const Footer = (props) => {
    const [thumbs, setThumbs] = useState(localStorage.getItem('thumbs') || 'regular')
    const [info, setInfo] = useState("")
    const {host} = props.prop

    const changeThumb = async()=>{
        if(thumbs === 'regular'){
            setThumbs('solid')
            localStorage.setItem('thumbs','solid')
            setInfo(' Thankyou for your support')
            setTimeout(()=>{
                setInfo("")
            },2000)
            try{
                await fetch(`${host}/api/access/likes`,{
                    method:'PUT'
                })
            }catch(err){}
        }else{
            setThumbs('regular')
            localStorage.setItem('thumbs','regular')
            setInfo(' Sorry! If you found it Unuseful')
            setTimeout(()=>{
                setInfo("")
            },2000)
        }
    }
  return (
    <>
    <div className='text-black pt-4' style={{background:'#e0e0e0'}}>
        <div className='container'>
            <div className='row'>
                <div>
                    <ul className="list-inline">
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/about'} style={{textDecoration:'none', color:'black'}}>About</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/product'} style={{textDecoration:'none', color:'black'}}>Product</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/privacy-policy'} style={{textDecoration:'none', color:'black'}}>Privacy Policy</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/pricing'} style={{textDecoration:'none', color:'black'}}>Pricing</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/contactus'} style={{textDecoration:'none', color:'black'}}>Feedback</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/contactus'} style={{textDecoration:'none', color:'black'}}>Report an Issue</Link></button></li>
                        <li className='list-inline-item'><button className='btn btn-default'><Link to={'/faq'} style={{textDecoration:'none', color:'black'}}>FAQs</Link></button></li>
                    </ul>
                </div>
                <hr/>
                <div>
                <p className='ms-3' style={{fontSize:'14px'}}>If you found anything useful, kindly show support by clicking the like button <button className='btn btn-default' onClick={changeThumb}style={{color:'blue'}}> <i className={`fa-${thumbs} fa-thumbs-up fs-2`}></i></button>{info}</p>
                </div>
            </div>
            
        </div>
    </div>
    <div className='text-white bg-dark pt-3'>
        <div className="container" id='copy'>
            <div>
                <p className='text-center' style={{fontSize:'14px'}}> &copy; 2024 Docschat</p>
            </div>
            <div>
                <p className='text-center' style={{fontSize:'14px'}}>Updated on : 09 Nov, 2024  V: 1.8</p>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer
