import React from 'react'
import { Link } from 'react-router-dom'

const Info = () => {
  return (
    <div style={{backgroundColor:'#FAEBD7', padding:'2%'}}>
        <div className='container p-4' >
            <h4>Engage with Documents Like Never Before: Discover Docschat, Your AI-Powered Document Chat System</h4>
            <p className='text-muted'>Docschat represents a leap forward in document management and user interaction. It empowers you to interact with documents in a more intuitive and productive manner.</p>

            <h5 className='mt-4'>Encourage Originality and Boost Document Interactions</h5>
            <p className='text-muted'>Imagine a future in which documents do more than just sit there passively on your screen—they answer your questions, carry on conversations, and help you learn new things. Docschat is an interactive conversation tool for your files, not just a reading tool. Your documents come to life thanks to this AI document interaction; they become not merely intelligent but also an extension of your team.</p>
            <h5 className='mt-4'>Documents Supported</h5>
            <button type="button" class="btn btn-outline-dark btn-sm me-1 mt-2" disabled>PDF</button>
            <button type="button" class="btn btn-outline-dark mx-1 btn-sm mt-2" disabled>TXT</button>
            <button type="button" class="btn btn-outline-dark mx-1 btn-sm mt-2" disabled>CSV</button>
            <button type="button" class="btn btn-outline-dark mx-1 btn-sm mt-2" disabled>Excel</button>
            <button type="button" class="btn btn-outline-dark mx-1 btn-sm mt-2" disabled>PPT</button>
            <button type="button" class="btn btn-outline-dark mx-1 btn-sm mt-2" disabled>DOCX</button>
            <button type="button" class="btn btn-outline-dark me-1 btn-sm mt-2" disabled>SQL</button>
            <p className='text-end'><Link to='/about' style={{textDecoration:'none', color:'black', fontWeight:'bold'}}>See More</Link></p>
        </div>
    </div>
  )
}

export default Info
