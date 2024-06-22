import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
    <div className='text-black pt-4' style={{background:'#e0e0e0'}}>
        <div className='container'>
            <div className='row'>
                <div className='col-md-8 col-xs-8'>
                    <strong>INFORMATION:</strong>
                    <ul>
                        <li>Large Language Model Integrated with Documents for Q and A.</li>
                        <li>LLM is an experiment and can give unexpected answers.</li>
                        <li>According to LLM providing Companies 1000 tokens are equal to 750 words.</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div className='text-white bg-dark pt-2'>
        <div className="container">
            <div className="row">
                <div className='col-md-4 col-xs-4'>
                    <p className='text-center' > &copy; 2024 Docschat</p>
                </div>
                <div className='col-md-4'><p className='text-center'>Developer Info: Mohd Zain <Link to={'https://mohdzain.com'} target="_blank" rel="noopener noreferrer"><i className="fa fa-external-link" aria-hidden="true"></i></Link> </p>
                </div>
                <div className='col-md-4 col-xs-4'>
                    <p className='text-center'>Updated on : 21 June, 2024  V: 1.1</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Footer
