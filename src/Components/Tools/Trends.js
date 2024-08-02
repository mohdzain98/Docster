import React from 'react'
import { Link } from 'react-router-dom'
import './tools.css'
import Searchbox from './Searchbox'

const Trends = (props) => {
    const {tool_host, showAlert} = props.prop
  return (
    <div id='trends'>
        <div className='container pb-4' style={{padding:'0 5%', marginTop:'-2%'}}>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <div class="breadcrumb-item dropdown">
                        <Link className='dropdown-toggle' data-bs-toggle="dropdown" style={{textDecoration:'none',color:'grey'}}>Tools</Link>
                        <ul class="dropdown-menu">
                            <li><Link className='dropdown-item' to='/tools/exa'>Exa Search</Link></li>
                            <li><Link className='dropdown-item' to='/tools/scholar'>Google Scholar</Link></li>
                            <li><Link className='dropdown-item' to='/tools/pubmed'>PubMed</Link></li>
                        </ul>
                    </div>
                    <li class="breadcrumb-item active" aria-current="page">Trends</li>
                </ol>
            </nav>
            <h1 className='text-primary mt-4'>Google Trends</h1>
            <hr/>
            <p className='text-muted'>Google Trends tells us what people are searching for, in real time.</p>
            <hr/>
            <Searchbox
                endpoint='gtrend'
                name='Trends'
                alert={showAlert}
                host={tool_host}
                placeholder='Find Trending Topics'
            />
        </div>
      
    </div>
  )
}

export default Trends
