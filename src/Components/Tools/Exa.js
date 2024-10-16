import React from 'react'
import { Link } from 'react-router-dom'
import './tools.css'
import Searchbox from './Searchbox'

const  Exa = (props) => {
    const {tool_host, showAlert} = props.prop
  return (
    <div id='exa'>
        <div className='container pb-4' style={{padding:'0 5%', marginTop:'-2%'}}>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to='/'>Home</Link></li>
                <div class="breadcrumb-item dropdown">
                    <Link className='dropdown-toggle' data-bs-toggle="dropdown" style={{textDecoration:'none',color:'grey'}}>Tools</Link>
                    <ul class="dropdown-menu">
                        <li><Link className='dropdown-item' to='/tools/trends'>Google Trends</Link></li>
                        <li><Link className='dropdown-item' to='/tools/scholar'>Google Sholar</Link></li>
                        <li><Link className='dropdown-item' to='/tools/pubmed'>PubMed</Link></li>
                    </ul>
                </div>
                <li class="breadcrumb-item active" aria-current="page">Exa Search</li>
            </ol>
        </nav>
        <h1 className='text-primary mt-4'>Exa Search</h1>
        <hr/>
        <p className='text-muted'>Exa (formerly Metaphor Search) is a search engine fully designed for use by LLMs.<br/>
        Unlike keyword-based search, Exa's neural search capabilities allow it to semantically understand queries and return relevant documents. </p>
        <h3 className='my-4'>How Exa is different from Traditional Browser Search</h3>
        <center><h5 style={{border:'solid 0.5px', padding:'2px'}}>Searching "Some Fascinating facts about cats?"</h5></center>
        <div className='row'>
            <div className='col-md-6'>
                <div className='sresult'>
                    <center><h5>Exa Search Result</h5></center>
                    <p>Here are some fascinating facts about cats:</p>
                    <ul id='exali'>
                        <li><strong>Sleeping Habits:</strong> Cats spend about 70% of their lives sleeping, which means a nine-year-old cat has only been awake for about three years of its life.</li>
                        <li><strong>Unique Communication: </strong>Cats primarily meow to communicate with humans, while they use body language to communicate with each other.</li>
                        <li><strong>Sense of Smell: </strong>A cat's sense of smell is approximately 14 times greater than that of a human, allowing them to detect scents that we cannot.</li>
                        <li><strong>Richest Cat: </strong>The world's richest cat is worth $13 million, having inherited a fortune from its owner.</li>
                        <li><strong>Brain Similarity: </strong>A cat's brain is biologically more similar to a human brain than to a dog's, particularly in the regions responsible for emotions</li>
                        <li><strong>Whiskers as Indicators: </strong>A cat's whiskers are not just for show; they help cats detect objects and navigate in the dark, and their position can indicate their mood.</li>
                    </ul>
                    <p style={{fontSize:'12px'}}>*these result can change</p>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='sresult'>
                    <center><h5>Browser Search</h5></center>
                    <p>Some Links of different website</p>
                    <ul>
                        <li>101 amazing cat facts
                            <ul>
                                <li>A house cat's genome is 95.6 percent tiger</li>
                                <li>etc..</li>
                            </ul>
                        </li>
                        <li>10 fun facts about cats
                            <ul>
                                <li>Cats can jump up to 6 times their height.</li>
                                <li>They have a total of 18 toes</li>
                                <li>There are over 500 million pet cats</li>
                                <li>Cats sleep for around 13 to 16 hours</li>
                                <li>etc..</li>
                            </ul>
                        </li>
                        <li>10 facts you dont know
                            <ul>
                                <li>Only 20% of Orange Cats Are Female</li>
                                <li>Cats Have Fewer Taste Buds Than Dogs or People</li>
                                <li>Cats Don't Get Cavities</li>
                                <li>etc..</li>
                            </ul>
                        </li>
                        <li>etc..</li>
                    </ul>
                </div>

            </div>
        </div>
        <hr/>
        <Searchbox
            endpoint='exasearch'
            name='Exa'
            alert={showAlert}
            host={tool_host}
            placeholder='Search Anything'
        />
        </div>
      
    </div>
  )
}

export default Exa
