import React from 'react'
import '../Styling/policy.css'

const Privacy = () => {

  return (
    <>
    <div className='container pb-4' id='privacy' style={{marginTop:'-3%', padding:'0 5%'}}>
    <center><h1 className='mb-4 fw-bold'>Privacy Policy</h1></center>
    <p className='text-end' style={{fontSize:'12px'}}><strong>Effective Date:</strong>  June 21, 2024</p>
    <hr class="hr hr-blur" style={{backgroundColor:'000000', height:'3px'}}></hr>

        <h2 className='mt-4'><small className='text-muted'>1. Introduction</small></h2>
        <hr />
        <p className='lead'>Welcome to Docschat. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our application. Please read this policy carefully to understand our views and practices regarding your personal data.</p>
        
        <h2 className='mt-4'><small className='text-muted'>2. Information We Collect</small></h2>
        <hr/>
        <div className='mx-3'>
        <h5>A. Personal Data:</h5>
        <p>We may collect personal identification information, such as your name, email address, and other contact details when you register on our site or use our services, so that we can maintain you account.</p>

        <h5>B. Document Data:</h5>
        <p>When you upload documents (PDF, TXT, CSV, Excel,PPT, Word, SQL files), we does not collect and process the data contained in these documents neither we store your document to our servers , rather we convert the content in vector store which can only be understand by Large Language Model to provide you with our services.</p>

        {/* <h5>C. Usage Data:</h5>
        <p>We collect information about how you interact with our service, such as the features you use and the actions you take.</p> */}
        </div>

        <h2 className='mt-4'><small className='text-muted'>3. How We Use Your Information</small></h2>
        <hr/>
        <p>We use the information we collect in the following ways:</p>
        <ul>
            <li><strong>To Provide and Maintain our Service:</strong> To deliver the services you request, including document interaction and processing.</li>
            <li><strong>To Improve Our Services:</strong> To understand how our users interact with Docschat, allowing us to enhance user experience and improve functionality.</li>
            <li><strong>To Communicate with You:</strong> To send you updates, newsletters, and other information related to our services.</li>
            <li><strong>To Ensure Security:</strong> To monitor and protect the security of our services, detect and prevent fraud, and comply with legal obligations.</li>
        </ul>

        <h2 className='mt-4'><small className='text-muted'>4. Sharing Your Information</small></h2>
        <hr/>
        <p>We do not sell, trade, or rent your personal data to third parties. We may share information with third-party service providers to help us operate our business and provide our services, such as:</p>
        <ul>
            <li><strong>Service Providers:</strong> Third-party companies that assist us in providing our services, such as cloud storage providers, message brokers and data analytics services.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.</li>
        </ul>

        <h2 className='mt-4'><small className='text-muted'>5. Data Security</small></h2>
        <hr/>
        <p>We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, use, or disclosure. Despite these measures, no method of transmission over the internet or method of electronic storage is completely secure.</p>

        <h2 className='mt-4'><small className='text-muted'>6. Your Data Protection Rights</small></h2>
        <hr/>
        <p>Depending on your location, you may have the following rights regarding your personal data:</p>
        <ul>
            <li><strong>Access:</strong> The right to request access to the personal data we hold about you.</li>
            <li><strong>Correction:</strong> The right to request correction of inaccurate personal data.</li>
            <li><strong>Deletion:</strong> The right to request deletion of your personal data.</li>
            <li><strong>Objection:</strong> The right to object to our processing of your personal data.</li>
            <li><strong>Data Portability:</strong> The right to request the transfer of your personal data to another party.</li>
        </ul>
        <p>To exercise these rights, please contact us at <mark><a href='mailto:support@docschat.in' id='anchor'>support@docschat.in</a></mark>.</p>

        <h2 className='mt-4'><small className='text-muted'>7. Changes to This Privacy Policy</small></h2>
        <hr/>
        <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.</p>

        <h2 className='mt-4'><small className='text-muted'>8. Contact Us</small></h2>
        <hr/>
        <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:</p>
        <p className='lead'>Docschat<br/>
        Bijnor, Uttar Pradesh, India<br/>
        Email:<a href='mailto:support@docschat.in' >support@docschat.in</a><br/></p>
    </div>
    </>
  )
}

export default Privacy
