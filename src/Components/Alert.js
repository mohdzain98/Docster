import React from 'react'

export default function Alert(props) {
  const icons = {primary:'fa-circle-info',success:'fa-circle-check',danger:'fa-circle-exclamation'}
return (
  <div>
    <div style={{height :'50px',marginTop:'55px'}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show fixed-top`} role="alert" style={{marginTop:'55px'}}>
      <strong><i className={`fa-solid ${icons[props.alert.type]} me-2`}></i></strong> {props.alert.msg}
    </div>}
    </div>
      
  </div>
)
}
