import React from 'react'

const Upcoming = () => {
  return (
    <div>
        <div className='container pb-4' style={{padding:'0 5%', marginTop:'-1%'}}>
            <h3>Upcoming Exciting Features</h3>
            <hr/>
            {/* <ul>
                <li>
                    <strong>Exa Search</strong>
                    <p style={{fontSize:'13px'}}>Ask the Question, let AI handle it to search for best result on the internet</p>
                    <p style={{marginTop:'-1%'}}>Search for documents on the internet using natural language queries, then retrieve cleaned HTML content from desired documents.</p>
                </li>
                <li>
                    
                </li>
            </ul> */}
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingOne">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    <strong>Exa Search</strong> : Ask the Question, let AI handle it to search for best result on the internet
                  </button>
                </h2>
                <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">Search for documents on the internet using natural language queries, then retrieve cleaned HTML content from desired documents. Unlike keyword-based search (Google), Exa's neural search capabilities allow it to semantically understand queries and return relevant documents. For example, we could search "fascinating article about cats" and compare the search results from Google and Exa. Google gives us SEO-optimized listicles based on the keyword "fascinating". Exa just works.</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingTwo">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    <strong>Image Generator</strong> : Dall-E Text to Image
                  </button>
                </h2>
                <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">OpenAI Dall-E are text-to-image models developed by OpenAI using deep learning methodologies to generate digital images from natural language descriptions</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingThree">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    <strong>Ionic Shooping Tool</strong> : Not to search on internet and visiting various websites, just ask this AI and it will search for you.
                  </button>
                </h2>
                <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">Ionic is a plug and play ecommerce marketplace for AI Assistants.</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFour">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                    <strong>Google Scholar Tool</strong> : AI helps in finding best Literature for Research.
                  </button>
                </h2>
                <div id="flush-collapseFour" class="accordion-collapse collapse" aria-labelledby="flush-headingFour" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">Benefical in research when Researcher is finding best Literature.</div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header" id="flush-headingFive">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                    <strong>PubMed</strong> : AI Assistant having Knowledge of Biomedical Literature
                  </button>
                </h2>
                <div id="flush-collapseFive" class="accordion-collapse collapse" aria-labelledby="flush-headingFive" data-bs-parent="#accordionFlushExample">
                  <div class="accordion-body">PubMed comprises more than 35 million citations for biomedical literature from MEDLINE, life science journals, and online books. Citations may include links to full text content from PubMed Central and publisher web sites.</div>
                </div>
              </div>
            </div>
        </div>
      
    </div>
  )
}

export default Upcoming
