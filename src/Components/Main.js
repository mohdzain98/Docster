import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'react-router-dom'
import '../Landing.css';
// import landImage from '../landImage.jpg'
import { Link as ScrollLink } from 'react-scroll';
import { useSelector } from 'react-redux'

const Main = (props) => {  
  const {login} = props.prop
  const type = useSelector(state => state.type)
  const sid = useSelector(state => state.sid)
  const [docType, setDocType] = useState('Documents');
  const docTypes = ['Documents','PDF', 'Text', 'CSV', 'Excel', 'SQL'];
  const currentIndex = useRef(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDocType(docTypes[currentIndex.current]);
      currentIndex.current = (currentIndex.current + 1) % docTypes.length;
    }, 1500); // Change the text every 1 second

    return () => clearInterval(intervalId); // Clear interval on component unmount
    // eslint-disable-next-line
  }, []);

  return (
    <>
    <section className='home' style={{marginTop:"-80px"}}>
        <div className='content' id='con'>
            <h2 className='name'>Docschat</h2>
            <h4 className='title'> <span>Your</span> Artificial Intelligence<span> based Chat System with </span>{docType} </h4>
            <p className='description'>Integrating AI capabilities to facilitate seamless and intelligent conversations, enhancing user experience. Utilizing Natural Language Processing (NLP) to comprehend and respond to user queries contextually. This system also includes document handling features, allowing users to upload, retrieve, and discuss document content within the chat interface.</p>
            {login ? 
            <div>
                <Link className='btn' to='/login'>Login</Link> 
                <Link className='btn' to='/signup'>Signup</Link>
            </div>
            : <div><ScrollLink className='btn' to='task' smooth={true} duration={50}>
                Get Started
              </ScrollLink>
              <Link className='btn' to={`/chat/${type}/${sid}`}>Chat</Link>
              </div>}
            
        </div>
        {/* <div className='image'>
            <img src='Docschat_transparent.png' alt='landim'/>
        </div> */}
    </section>
    </>
  )
}

export default Main
