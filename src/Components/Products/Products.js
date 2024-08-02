import React from 'react'
import './Styling/products.css'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div className='container pb-4' id='products' style={{padding:'0 5%', marginTop:'-2%'}}>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Product</li>
            </ol>
        </nav>
        <div className='box p-4 mt-4'>
            <h4 className='mt-2'>SurfMind</h4>
            <hr/>
            <p className='text-muted'>SurfMind is a cutting-edge Chrome extension designed to enhance your browsing experience by intelligently tracking and managing the websites you visit.</p>
            <Link to={'/product/surfmind'}><button type="button" class="btn btn-outline-primary">See More</button></Link>
            <Link to={'https://chromewebstore.google.com/detail/surfmind/ladckalplikfcplbihpgfnlkonnpehkj'} target='_blank' rel='noopener noreferrer'><button type="button" class="btn btn-outline-primary mx-2">Add To Chrome</button></Link>
        </div>
    </div>
  )
}

export default Products
