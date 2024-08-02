import React from 'react'
import { Link } from 'react-router-dom'
import '../Styling/about.css'

const About = () => {

  return (
    <>
    <div className="container pb-4" style={{padding:'0 5%', marginTop:'-2%'}} id='about' >
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li class="breadcrumb-item active" aria-current="page">About</li>
            </ol>
        </nav>
        <h1 className='text-primary'>About Docschat</h1>
        <hr className='text-primary' style={{height:'2px'}}/>
        <p className='lead'>Welcome to Docschat! Our mission is to revolutionize the way you interact with documents using advanced Large Language Models (LLMs). Docschat allows you to have natural, conversational interactions with a variety of document types, enhancing your ability to retrieve and understand information quickly and intuitively.</p>
        
        <h2 className='mt-4 text-success'>What is Docschat?</h2>
        <hr className='text-success'/>
        <p>Docschat is an innovative application designed to facilitate seamless communication with documents. By leveraging the power of LLMs, Docschat  provides an intuitive interface for querying and interacting with documents such as PDFs, TXT files, CSVs, Excel spreadsheets, Powerpoint, Word files  and SQL databases. Additionally, it incorporates advanced tools for content retrieval.</p>
        
        <h2 className='mt-4 text-black-50'>Features</h2>
        <hr className='text-black-50'/>
        <ul>
            <li><strong>Natural Language Querying:</strong> Use everyday language to interact with your documents, making information retrieval easy and efficient.</li>
            <li><strong>Context-Aware Responses:</strong> Receive accurate and relevant information tailored to the context of your queries.</li>
            <li><strong>Multi-Document Support:</strong> Engage with multiple documents simultaneously for comprehensive research and analysis.</li>
            <li><strong>Enhanced Effciency</strong> Quickly locate specific information within extensive document sets..</li>
        </ul>
        
        <h2 className='mt-4 text-danger'>How It Works</h2>
        <hr className='text-danger'/>
        <p>Docschat extracts text from PDFs and TXT files, performs statistical calculations on CSV and Excel files,
            extract text from ppt, word files and can provide insights  and writes and executes queries on SQL files to provide you with the desired results. Whether you're conducting academic research, navigating legal documents, analyzing business data, or providing customer support, Docschat is here to assist you.</p>
        <p className='text-muted'>Core Functionalities</p>
        <ul>
            <li><strong>PDF and TXT Files : </strong>Extract and interact with text content efficiently</li>
            <li><strong>CSV and Excel Files : </strong>Perform statistical calculations and data analysis</li>
            <li><strong>PPT and Word Files : </strong>Able to find out insights in these files.</li>
            <li><strong>SQL Files : </strong>Write and execute queries to retrieve and manipulate data, providing desired results</li>
        </ul>

        <h2 className='mt-4 text-success'>Tools</h2>
        <hr className='text-success'/>
        <p>Docschat contains advanced tools for content retrieval tasks.</p>
        <ul>
            <li><strong>Exa Search : </strong>Exa is search engine designed for LLMs to retrieve relevant informations from queries.</li>
            <li><strong>Google Trends : </strong>This tool finds trending searches from google about any topic. This tool uses SerpApi in backend.</li>
            <li><strong>Google Scholar : </strong>This tool find relevant scholarly article as it sees content of article and finds how much it is similar to the query.</li>
            <li><strong>PubMed : </strong>This tool finds citation related to Biomedical Literature.</li>
        </ul>
        
        <h2 className='mt-4 text-info'>Team</h2>
        <hr className='text-info'/>
        <div className="team">
            <div className="team-member">
                <h3>Mohd Zain</h3>
                <p>Machine Learning Enthusiast and Developer</p>
                <p>Zain is a tech visionary with a passion for artificial intelligence and machine learning. He leads the Docschat team with a focus on innovation and excellence.</p>
                <Link style={{textDecoration:'none'}} to={'https://mohdzain.com'} target='_blank' rel='nonreferer'>Portfolio</Link>
                <p className='text-muted'>Connect at</p>
                <p className="social">
                    <Link to="https://www.linkedin.com/in/zainatlink/" className="blue" target='_blank' rel="noopener"><i className="fa fa-linkedin"></i></Link>
                    <Link to="https://github.com/mohdzain98" className="black" target='_blank' rel="noopener"><i className="fa fa-github"></i></Link>
                    <Link to="http://www.facebook.com/zain.rehman.9889" className="blue" target='_blank' rel="noopener"><i className="fa fa-facebook"></i></Link>
                    <Link to="https://www.instagram.com/m0hd.zain/" className="insta" target='_blank' rel="noopener"><i className="fa fa-instagram" target="_blank"></i></Link>
                    <Link to="https://x.com/M0hdZain"  className="blue" target='_blank' rel="noopener"><i className="fa fa-twitter"></i></Link>
                </p>
            </div>
        </div>
        
        <h2 className='mt-4 text-secondary'>Contact Us</h2>
        <hr className='text-secondary'/>
        <p>If you have any questions or feedback, feel free to <mark><Link to={'/contactus'} style={{color:'black'}}>Contact Us</Link></mark></p>
        <p>Or Write us Email at : <a href="mailto:support@docschat.in">support@docschat.in</a></p>
    </div>
    </>
  )
}

export default About
