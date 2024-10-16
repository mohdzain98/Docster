import React from 'react'
import { Link } from 'react-router-dom'
import '../Styling/terms.css'

const Terms = () => {
  return (
    <div className='container pb-4' style={{padding:'0 5%',marginTop:'-3%'}} id='terms'>
        <center><h1 className='mb-4 fw-bold'>Terms of Service</h1></center>
        <p className='text-end' style={{fontSize:'12px'}}><strong>Effective Date: </strong>21 June, 2024</p>
        <p className='text-end' style={{marginTop:'-12px',fontSize:'12px'}}><strong>Country: </strong>India<Link style={{textDecoration:'none'}}></Link></p>
        <hr style={{height:'2px'}}/>

        <h4 className='mt-4'>1. Acceptance of Terms</h4>
        <hr/>
        <p className='lead'>By accessing and using Docschat(the "Service"), you agree to comply with and be bound by these Terms of Service (the "Terms"). If you do not agree to these Terms, you may not use the Service.</p>


        <h4 className='mt-4'>2. Use of Service</h4>
        <hr/>
        <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to use the Service:</p>
        <ul>
            <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
            <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent.</li>
            <li>To impersonate or attempt to impersonate Docschat, another user, or any other person or entity.</li>
            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Service, or which, as determined by us, may harm Docschat or users of the Service or expose them to liability.</li>
        </ul>

        <h4 className='mt-4'>3. User Accounts</h4>
        <hr/>
        <p>To access certain features of the Service, you are required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

        <h4 className='mt-4'>4. Intellectual Property</h4>
        <hr/>
        <p>The Service and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Docschat, its licensors, or other providers of such material and are protected by Indian Law and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

        <h4 className='mt-4'>5. Prohibited Activities</h4>
        <hr/>
        <p>You agree not to:</p>
        <ul>
            <li>Use the Service in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Service.</li>
            <li>Use any robot, spider, or other automatic device, process, or means to access the Service for any purpose, including monitoring or copying any of the material on the Service.</li>
            <li>Use any manual process to monitor or copy any of the material on the Service or for any other unauthorized purpose without our prior written consent.</li>
            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.</li>
            <li>Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Service, the server on which the Service is stored, or any server, computer, or database connected to the Service.</li>
            <li>Host, display, upload, modify, publish, transmit, store, update or share any information that belongs to another person or entity and to which you do not have any right, including personal or confidential information of any person or entity with respect to which you do not have consent or permission from such person or entity</li>
            <li>Use our Services in any manner that threatens the unity, integrity, defence, security or sovereignty of India, friendly relations of India with other countries, or public order, or causes incitement to the commission of any cognisable offence or prevents investigation of any offence or is insulting other countries</li>
        </ul>

        <h4 className='mt-4'>6. Personal  Information and  Privacy</h4>
        <hr/>
        <ul>
            <li>Personal information you provide to Docschat through the Service is governed by <Link to='/privacy-policy'>Docschat Privacy Policy</Link>.Your election to use the Service indicates your acceptance of the terms of the Privacy Policy</li>
            <li>You are responsible for maintaining confidentiality of your username, password and other sensitive information</li>
            <li>You are responsible for all activities that occur in your user account and you agree to inform us immediately of any unauthorized use of your user account by email to <a href='mailto:support@docschat.in' target='_blank' rel="noreferrer">support@docschat.in</a></li>
        </ul>

        <h4 className='mt-4'>7. Complaints</h4>
        <hr/>
        <p>If we receive a complaint from any person with respect to your activities as part of use of the Services, we will forward the complaint to the primary email address of your user account. You must respond to the complainant directly within 7 days of receiving the complaint forwarded by us and copy Docschat in the communication. If you do not respond to the complainant within 7 days from the date of our email to you, we may disclose your name and contact information to the complainant for enabling the complainant to take legal action against you. You understand that your failure to respond to the forwarded complaint within the 7 days time limit will be construed as your consent to disclosure of your name and contact information by Docschat to the complainant.</p>

        <h4 className='mt-4'>8. Limitation of Liability</h4>
        <hr/>
        <p>In no event will Docschat, its affiliates, or their licensors are liable for any consequential, incidental, indirect, special, punitive, or other loss or damage whatsoever or for loss of business profits, business interruption, computer failure, loss of business information, or other loss arising out of or caused by your use of or inability to use the service, even if Docschat has been advised of the possibility of such damage</p>

        <h4 className='mt-4'>9. Changes to Terms</h4>
        <hr/>
        <p>We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on the Service. Your continued use of the Service following the posting of changes constitutes your acceptance of such changes.</p>

        <h4 className='mt-4'>10. End of Terms of Service</h4>
        <hr/>
        <p>if you have any questions or concerns regarding this Agreement, please contact us at: <a href='mailto:support@docschat.in' style={{textDecoration:'none',color:'black'}}><mark>support@docschat.in</mark></a></p>
      
    </div>
  )
}

export default Terms
