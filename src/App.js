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


function App() {
  const [alert, setAlert] = useState(null)
  const [login, setLogin] = useState(true)
  const type = useSelector(state => state.type)
  const host = process.env.REACT_APP_HOST
  const llm_host = process.env.REACT_APP_LLM_HOST
  console.log(host)

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
    },2000)
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
        <Route exact path='/chat' element={<Chatbox prop={{host, showAlert, llm_host}}/>}></Route>
        <Route exact path={`/chat/${type}`} element={<Chatbox prop={{host, showAlert, llm_host}}/>}></Route>
        <Route exact path='/visitors' element={<Visitor/>}></Route>
        {/* <Route exact path='/chat/txt' element={<Chatbox prop={{host, showAlert}}/>}></Route>
        <Route exact path='/chat/csv' element={<Chatbox prop={{host, showAlert}}/>}></Route>
        <Route exact path='/chat/xlsx' element={<Chatbox prop={{host, showAlert}}/>}></Route>
        <Route exact path='/chat/sql' element={<Chatbox prop={{host, showAlert}}/>}></Route> */}
    </Routes>
    </Router>
    </UserState>
    </div>
    </>
  );
}

export default App;
