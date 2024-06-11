import React from 'react'

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
    <div class="container">
        <div class="row">
            <div className='col-md-6 col-xs-12'>
                <p className='text-end d-none d-lg-block'> &copy; 2024 Docster</p>
                <p className='text-start d-lg-none'>&copy; 2024 Docster</p>
            </div>
            <div className='col-md-6 col-xs-12'><p className='text-start'>Updated on : 10 June, 2024</p></div>
        </div>
    </div>
    </div>
    </>
  )
}

export default Footer
