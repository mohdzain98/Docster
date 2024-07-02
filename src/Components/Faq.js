import React from 'react'
import { Link } from 'react-router-dom'

const Faq = () => {
  return (
    <div id='faq'>
    <div className='container p-4' style={{marginTop:'-2%'}}>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li class="breadcrumb-item active" aria-current="page">FAQs</li>
            </ol>
        </nav>
            <center><h2 className='text-start'>Frequently Asked Questions</h2></center>
            <hr className='mb-4' style={{color:'black',height:'2px'}}/>
        <div className="accordion accordion-flush" id="accordionFlushExample">
                <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    What Type of Documents Docschat Support
                </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                <div class="accordion-body">
                Docschat Support five types of Documents 
                <ul>
                    <li><strong>PDF : </strong>Any type of PDF files: text, images or mixed</li>
                    <li><strong>TXT : </strong>Any type of text file</li>
                    <li><strong>CSV : </strong>Any type of CSV file</li>
                    <li><strong>Excel : </strong>Any type of Excel file</li>
                    <li><strong>SQL : </strong>SQL file of Sqlite and MySQL DB</li>
                </ul>
                </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Is This a Secure Service
                </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">Our service is built with industry-standard security measures to protect your data. We prioritize the privacy and security of your information..</div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    How is Privacy Maintained
                </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">we do not collect and process the data contained in these documents neither we store your document to our servers , rather we convert the content in vector store which can only be understand by Large Language Model to provide you with our services.</div>
                </div>
            </div>
        </div>
        <hr className='mt-4' style={{color:'black',height:'2px'}}/>
        <p className='lead'>For any other question kindly: <mark><Link to='/contactus' style={{textDecoration:'none', color:'black'}}>Contact Us</Link></mark></p>
      
    </div>
    </div>
  )
}

export default Faq
