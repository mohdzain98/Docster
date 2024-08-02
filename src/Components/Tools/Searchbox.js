import React,{useState, useRef, useEffect} from 'react'
import './tools.css'


const Searchbox = (props) => {
    const {name, endpoint, alert, host, placeholder} = props
    const [result, setResult] = useState("")
    const [loader, setLoader] = useState("")
    const [clas, setClas] = useState("")
    const [query, setQuery] = useState("")
    const EndRef = useRef(null);

    useEffect(()=>{
        if (EndRef.current) {
            EndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
         // eslint-disable-next-line
      },[result])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoader("spinner-border spinner-border-sm mx-4")
        try {
            const response = await fetch(`${host}/${endpoint}`,{
                method:'POST',
                headers: {
                "Content-Type": "application/json",
                }, 
                body: JSON.stringify({query:query})
            })
            if(response.status === 200){
                const res = await response.json()
                const text = await res.result
                const formattedText = await text.replace(/\n/g, "<br>")
                setClas('sresult')
                setResult(formattedText)
                setLoader("")
                setQuery("")
            }else{
                alert('Not able to search at this moment','danger')
                setLoader("")
            }
        } catch (error) {
            alert('Some Error Occurred','danger')
            setLoader("")
        }
    }
  return (
    <div>
        <div className='mt-4 mb-4'>
            <h3>{`Search With ${name}`}</h3>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="mb-3">
                <input className="form-control form-control-lg" id='search' type="text" placeholder={placeholder} value={query} onChange={(e)=>setQuery(e.target.value)} required></input>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3" style={{width:'200px'}}>Search</button>
                    <span className={loader}></span>
                </div>
            </form>
        </div>
        <div className={clas}>
        <p dangerouslySetInnerHTML={{ __html: result }}></p>
        </div>
        <div ref={EndRef} />
    </div>
  )
}

export default Searchbox
