import React from 'react'
import { Link } from 'react-router-dom'
import './tools.css'
import Searchbox from './Searchbox'

const Pubmed = (props) => {
    const {tool_host, showAlert} = props.prop
  return (
    <div id='pubmed'>
        <div className='container pb-4' style={{padding:'0 5%', marginTop:'-2%'}}>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                    <div class="breadcrumb-item dropdown">
                        <Link className='dropdown-toggle' data-bs-toggle="dropdown" style={{textDecoration:'none',color:'grey'}}>Tools</Link>
                        <ul class="dropdown-menu">
                            <li><Link className='dropdown-item' to='/tools/exa'>Exa Search</Link></li>
                            <li><Link className='dropdown-item' to='/tools/trends'>Google Trends</Link></li>
                            <li><Link className='dropdown-item' to='/tools/scholar'>Google Scholar</Link></li>
                        </ul>
                    </div>
                    <li class="breadcrumb-item active" aria-current="page">PubMed</li>
                </ol>
            </nav>
            <h1 className='text-primary mt-4'>PubMed</h1>
            <hr/>
            <p className='text-muted'>PubMed  comprises more than 35 million citations for biomedical literature from MEDLINE, life science journals, and online books. Citations may include links to full text content from PubMed Central and publisher web sites.</p>
            <hr/>
            <Searchbox 
                endpoint='pubmed'
                name='PubMed'
                alert={showAlert}
                host={tool_host}
                placeholder='Find citations for Biomedical Literature'
            />

        </div>
      
    </div>
  )
}

export default Pubmed
