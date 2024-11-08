import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Styling/products.css'
import { useMediaQuery } from 'react-responsive'

const Surfmind = () => {
    const [active, setActive] = useState('about')
    const [about, setAbout] = useState(true)
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    const aboutt = ()=>{
        setAbout(true)
        setActive('about')
    }
    const policy = ()=>{
        setAbout(false)
        setActive('policy')
    }
  return (
    <div className='container p-4' style={isTabletOrMobile?{marginTop:'-10%'}:{marginTop:'-2%'}} id='surfmind'>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li class="breadcrumb-item"><Link to='/product'>Product</Link></li>
                <li class="breadcrumb-item active" aria-current="page">SurfMind</li>
            </ol>
        </nav>
        
        <div>
            <nav class="nav nav-pills justify-content-center">
                <li class="nav-item">
                    <Link class="nav-link text-dark" onClick={aboutt}>About</Link>
                    {active === 'about'?<hr className='text-dark' style={{marginTop:'-1%'}}/>:""}
                </li>
                <li class="nav-item">
                    <Link class="nav-link text-dark" onClick={policy}>Privacy Policy</Link>
                    {active === 'policy'?<hr className='text-dark' style={{marginTop:'-1%'}}/>:""}
                </li>
            </nav>
        </div>

        {about ? <div>
        <h1>SurfMind</h1>
        <hr/>
        <h4 className='mt-4 text-primary'>Introduction to SurfMind: AI-Powered Browsing History Tracker</h4>
        <hr className='text-primary'/>
        <p>SurfMind is a cutting-edge Chrome extension designed to enhance your browsing experience by intelligently tracking and managing the websites you visit. Leveraging advanced AI technologies like Large Language Models and FAISS, SurfMind provides a seamless and efficient way to keep a detailed log of your web activity.</p>

        <h5 className='mt-4 text-success'>Key Features</h5>
        <hr className='text-success'/>
        <ul>
            <li><strong>Automatic Website Tracking</strong> : Effortlessly logs every website you visit, along with key content, ensuring you never lose track of important information</li>
            <li><strong>AI-Powered Search</strong> : Utilize powerful AI models to search your browsing history by topic. Simply ask SurfMind about the websites you've visited related to specific topics, and it will quickly retrieve relevant results</li>
            <li><strong>Local Data Storage</strong> : Keeps your data securely stored locally on your device, ensuring privacy and security. Data is only sent to the server when you initiate a search, reducing server load and enhancing performance</li>
            <li><strong>Efficient Data Management</strong> : Automatically manages and maintains your browsing history, keeping only the most recent and relevant data to avoid unnecessary storage buildup</li>
            <li><strong>User-Friendly Interface</strong> : Features an intuitive and responsive interface built with React and Bootstrap, making it easy to view and search your browsing history.</li>
        </ul>
        <h5 className='mt-4 text-danger'>How It Works ? </h5>
        <hr className='text-danger'/>
        <ul>
            <li><strong>Tracking and Storage</strong> : As you browse, SurfMind tracks the websites you visit and stores the data locally in your browser's storage</li>
            <li><strong>Data Ingestion</strong> :  When you perform a search, SurfMind ingests the locally stored data and sends it to the server for processing</li>
            <li><strong>AI-Driven Search</strong> : The server utilizes advanced AI models to analyze and retrieve the most relevant websites based on your search query</li>
            <li><strong>Efficient Retrieval</strong> : Results are promptly returned to you, providing a comprehensive overview of your browsing history related to your query</li>
        </ul>
        <h5 className='mt-4 text-secondary'>Benefits</h5>
        <hr className='text-secondary'/>
        <ul>
            <li><strong>Enhanced Productivity</strong> : Quickly find websites you've previously visited without having to remember specific URLs or manually search through your history</li>
            <li><strong>Privacy-Focused</strong> : Your data remains private and secure, stored locally, and only shared when necessary for search operations</li>
            <li><strong>AI Integration</strong> : Leverage state-of-the-art AI technologies to make your browsing history more accessible and useful</li>
        </ul>
        </div>:
        <div>
            <h2>Privacy Policy</h2>
            <p style={{fontSize:'12px'}}><strong>Effective Date:</strong>  14 July, 2024</p>
            <hr/>
            <p className='lead'>SurfMind is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you use our Chrome extension.</p>
            <h5 className='mt-4 text-secondary'>1. Information We Collect</h5>
            <hr className='text-secondary'/>  
            <ul>
                <li>Browsing History Data</li>
                <ul>
                    <li>URLs of websites you visit</li>
                    <li>Timestamps of your visits</li>
                    <li>Content snippets from visited pages</li>
                </ul>
            </ul>      
            <h5 className='mt-4 text-secondary'>2. How we use your Information</h5>
            <hr className='text-secondary'/> 
            <ul>
                <li>Browsing History Data</li>
                <ul>
                    <li>To allow you to search your browsing history based on specific topics or keywords.
                    </li>
                </ul>
            </ul>
            <h5 className='mt-4 text-secondary'>3. Data Storage and Transmission</h5>
            <hr className='text-secondary'/> 
            <ul>
                <li>Local Storage</li>
                <ul><li>Your browsing history data is stored locally on your device using chrome local storage. This ensures your data remains private and secure.</li></ul>
                <li>Data Transmission to Server
                    <ul>
                        <li>Data is only transmitted to our server when you perform a search action. This minimizes unnecessary data transfer and reduces server load</li>
                        <li>We use HTTPS to ensure secure data transmission.</li>
                    </ul>
                </li>
            </ul>
            <h5 className='mt-4 text-secondary'>4. Data Retention</h5>
            <hr className='text-secondary'/>
            <ul><li>We keep only a limited period of browsing data locally to prevent excessive data accumulation. Older data is removed based on a predefined retention period.</li></ul>

            <h5 className='mt-4 text-secondary'>5. Security Measures</h5>
            <hr className='text-secondary'/>
            <ul>
                <li>We use secure methods to handle your data both locally and on our servers</li>
                <li>Data on our servers is managed using appropriate technology for each user to ensure data separation and security.</li>
            </ul>

            <h5 className='mt-4 text-secondary'>6. Tabs Justifications</h5>
            <hr className='text-secondary'/>
            <ul>
                <li>Tabs<ul><li>Required to track and save URLs of visited websites for building a comprehensive browsing history.</li></ul></li>
                <li>Storage<ul><li>Needed to store browsing data locally on your device, ensuring data availability and security.</li></ul></li>
                <li>WebNavigation<ul><li>Allows tracking of web navigation events to record detailed browsing history</li></ul></li>
                <li>Scripting<ul><li>Enables injection of scripts to extract content from visited web pages.</li></ul></li>
                <li>ActiveTab<ul><li>Provides access to the currently active tab for real-time data extraction and search functionality.</li></ul></li>
                <li>All URLs<ul><li>Necessary to access all URLs visited by you to ensure comprehensive data collection for the browsing history feature</li></ul></li>
            </ul>

            <h5 className='mt-4 text-secondary'>7. Your Choices</h5>
            <hr className='text-secondary'/>
            <ul><li>You can clear your browsing history data at any time by using the clear data option in the extension settings.</li></ul>

            <h5 className='mt-4 text-secondary'>8. Changes to This Privacy Policy</h5>
            <hr className='text-secondary'/>
            <ul><li>We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Effective Date" at the top of this Privacy Policy. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</li></ul>

            <h5 className='mt-4 text-secondary'>9. Contact Us</h5>
            <hr className='text-secondary'/>
            <p>If you have any questions or concerns about this Privacy Policy, please contact us at </p>
            <a href='mailto:support@docschat.in'>support@docschat.in</a>

            <hr/>
            <p className='text-muted'>By using SurfMind, you acknowledge and agree to this Privacy Policy.</p>
        </div>}
    </div>
  )
}

export default Surfmind
