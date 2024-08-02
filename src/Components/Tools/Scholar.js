import React from 'react'
import { Link } from 'react-router-dom'
import './tools.css'
import Searchbox from './Searchbox'

const Scholar = (props) => {
    const {tool_host,showAlert} = props.prop
  return (
    <div id='scholar'>
        <div className='container pb-4' style={{padding:'0 5%', marginTop:'-2%'}}>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <div class="breadcrumb-item dropdown">
                        <Link className='dropdown-toggle' data-bs-toggle="dropdown" style={{textDecoration:'none',color:'grey'}}>Tools</Link>
                        <ul class="dropdown-menu">
                            <li><Link className='dropdown-item' to='/tools/exa'>Exa Search</Link></li>
                            <li><Link className='dropdown-item' to='/tools/trends'>Google Trends</Link></li>
                            <li><Link className='dropdown-item' to='/tools/pubmed'>PubMed</Link></li>
                        </ul>
                    </div>
                    <li class="breadcrumb-item active" aria-current="page">Scholar</li>
                </ol>
            </nav>
            <h1 className='text-primary mt-4'>Google Scholar</h1>
            <hr/>
            <p className='text-muted'>Google Scholar provides a simple way to broadly search for scholarly literature. From one place, you can search across many disciplines and sources</p>
            <hr/>
            <Searchbox 
                endpoint='gscholar'
                name='Scholar'
                alert={showAlert}
                host={tool_host}
                placeholder='Find Scholarly Articles'
            />

        </div>
      
    </div>
  )
}

export default Scholar
