import React, { useState, useEffect } from 'react';
import '../Styling/cookies.css'

const Cookies = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Check if the user has already accepted cookies
        const cookieAccepted = localStorage.getItem('cookieAccepted');
        if (!cookieAccepted) {
            setShow(true);
        }
    }, []);

    const acceptCookies = () => {
        // Set a flag in local storage to remember the user's choice
        localStorage.setItem('cookieAccepted', true);
        setShow(false);
    };

    const rejectCookies =()=>{
        setShow(false)
    }

    if (!show) {
        return null;
    }
  return (
    <div>
      <div className="cookie-notification">
            <p>This site uses cookies or similar technologies to enhance your experience. By continuing to use this site, you accept our use of cookies.</p>
            <button onClick={rejectCookies} className='my-2 mx-2'>Reject</button>
            <button onClick={acceptCookies} className='mx-2'>Accept</button>
            
        </div>
    </div>
  )
}

export default Cookies
