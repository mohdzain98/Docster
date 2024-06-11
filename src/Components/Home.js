import React from 'react'
import Main from './Main'
import Tasks from './Tasks'
import Footer from './Footer'

const Home = (props) => {
  const {host, login, Logdout, showAlert} = props.prop
  return (
    <>
    <Main prop={{login, Logdout}}/>
    <Tasks prop={{host, showAlert}}/>
    <Footer/>
    </>
  )
}

export default Home
