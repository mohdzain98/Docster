import './App.css';
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import{BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/Login'
import Alert from './Components/Alert';
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux'
import UserState from './Context/UserState';
import Chatbox from './Components/Chatbox'
import Visitor from './Components/Visitor';
import Contact  from './Components/Contact';
import Privacy from './Components/Privacy';
import About from './Components/About';
import Pricing from './Components/Pricing';
import Faq from './Components/Faq';
import Forgot from './Components/Forgot';
import Terms from './Components/Terms';
import Cookies from './Components/Cookies';

function App() {
  const [alert, setAlert] = useState(null)
  const [login, setLogin] = useState(true)
  const type = useSelector(state => state.type)
  const sid = useSelector(state => state.sid)
  const host = process.env.REACT_APP_HOST
  const llm_host = process.env.REACT_APP_LLM_HOST
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setLogin(false)
    }
     // eslint-disable-next-line
  },[])

  const showAlert = (message, type) =>{
    setAlert({
      msg : message,
      type :type
    })
    setTimeout(() =>{
      setAlert(null)
    },3500)
  }
  const Logdin = () => {
    setLogin(true);
  };

  const Logdout = () => {
    setLogin(false);
  };

  return (
    <>
    <div>
    <UserState host={{host}}>
    <Router>
    <Navbar prop={{host,Logdin,showAlert}}/>
    <Alert alert={alert}/>
    <Routes>
        <Route exact path="/" element={<Home prop={{host, showAlert, Logdin, Logdout, login, llm_host}}/>}></Route>
        <Route exact path='/login' element={<Login prop={{host, showAlert, Logdout}}/>}></Route>
        <Route exact path='/signup' element={<Signup prop={{host, showAlert, Logdout}}/>}></Route>
        <Route exact path='/chat/default' element={<Chatbox prop={{host, showAlert, llm_host}}/>}></Route>
        <Route exact path={`/chat/${type}/${sid}`} element={<Chatbox prop={{host, showAlert, llm_host}}/>}></Route>
        <Route exact path='/visitors' element={<Visitor/>}></Route>
        <Route exact path='/contactus' element={<Contact prop={{showAlert}}/>}></Route>
        <Route exact path='/privacy-policy' element={<Privacy />}></Route>
        <Route exact path='/about' element={<About/>}></Route>
        <Route exact path='/pricing' element={<Pricing/>}></Route>
        <Route exact path='/faq' element={<Faq/>}></Route>
        <Route exact path='/in/terms' element={<Terms />}></Route>
        <Route exact path='/forgot-password' element={<Forgot prop={{host, showAlert}} />}></Route>
    </Routes>
    <Cookies/>
    </Router>
    </UserState>
    </div>
    </>
  );
}

export default App;
