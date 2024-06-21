import React from 'react'
import Main from './Main'
import Tasks from './Tasks'
import Footer from './Footer'

const Home = (props) => {
  const {host, login, Logdout, showAlert, llm_host} = props.prop
  return (
    <>
    <Main prop={{login, Logdout}}/>
    <Tasks prop={{host, showAlert, llm_host}}/>
    <Footer/>
    </>
  )
}

export default Home
