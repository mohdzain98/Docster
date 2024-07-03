import React from 'react'
import TaskItem  from './TaskItem'
import '../index.css'
import tasks from '../alltask'


const Tasks = (props) => {
    const {host, showAlert, llm_host} = props.prop
  return (
    <>
    <div style={{padding:'2%'}}>
    <div className='container' id='task' style={{marginTop:"50px", marginBottom:"50px"}}>
        <center>
        <div className="text">Documents at a Glance</div>
        <div className="underline"></div>
        </center>
        <div className='row' style={{marginTop:"30px"}}>
            {tasks.map((element)=>{
                return (
                    <div className='col-md-4 col-xs-12'>
                        <TaskItem
                            taskName={element.taskName}
                            imgSrc={element.imgSrc}
                            text={element.text}
                            bg={element.bg}
                            ol={element.ol}
                            btnRef={element.btnHref}
                            btnClass={element.btnClass}
                            alert={showAlert}
                            host={host}
                            llm_host={llm_host}
                            type={element.type}
                        />
                    </div>
                )
            })}

        </div>
    </div>
    </div>
    </>
  )
}

export default Tasks
