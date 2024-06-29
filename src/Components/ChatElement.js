import React,{useContext} from 'react'
// import person from '../Assets/person.png'
import userContext from '../Context/userContext'


const ChatElement = ({id, symbol, Chat, alert}) => {
  const context = useContext(userContext)
  const {user} = context

  // const handleCopy = () => {
  //     let text = document.getElementsByTagName('p')
  //     // console.log(text)
  //     // text[id]
  //     navigator.clipboard.writeText(text[id])
  //     document.getSelection().removeAllRanges()
  //     alert("Copied to Clipboard","success")
  // }

  return (
    <>
    <div className="column">
      <div className='heading'>{symbol%2===0?"D":user[0]}</div>
        <div className="row1">
          <p id={id}>{Chat}</p>
        </div>
        {/* <div><i className="fa-solid fa-copy mx-1 copy" onClick={handleCopy} data-toggle="tooltip" data-placement="top" title="copy"></i></div> */}
    </div>
    </>
  )
}

export default ChatElement
