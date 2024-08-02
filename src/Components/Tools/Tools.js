import React from 'react'
import { useNavigate } from 'react-router-dom'
import './tools.css'
import tools from '../../alltool'

const Tools = () => {
    const navigate = useNavigate()

    const handleClick =(href)=>{
        navigate(`/tools/${href}`)
    }

  return (
    <div id='tool' style={{background:'#F0FFFF',padding:'2%'}}>
        <div className='container' style={{marginTop:"30px", marginBottom:"60px"}}>
            <center>
                <div className="text">Goblet of Tools</div>
                <div className="underline"></div>
            </center>
            <div className='row' style={{marginTop:"50px"}}>
                {tools.map((element)=>{
                    return(
                        <div className='col-md-3 col-xs-12'>
                            <div className='box p-4 mb-4' onClick={() => handleClick(element.href)}>
                                <h5 className='text-primary'>{element.toolName} <i className="fa-solid fa-greater-than fa-xs ms-2 text-dark"></i></h5>
                                <p className='text-muted' style={{fontSize:'12px'}}>{element.Desc}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default Tools
