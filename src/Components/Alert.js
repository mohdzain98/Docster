import React from 'react'

export default function Alert(props) {
  const capitalize = (word) => {
    if(word === 'danger'){
      word = "Error"
    }
    let nword = word.toLowerCase();
    return nword.charAt(0).toUpperCase() + nword.slice(1);
  }
return (
  <div>
    <div style={{height :'50px',marginTop:'55px'}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top`} role="alert" style={{marginTop:'55px'}}>
      <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
    </div>}
    </div>
      
  </div>
)
}
