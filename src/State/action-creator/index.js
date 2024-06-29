export const changeFile = (ref, callback) =>{
    return (dispatch)=>{
        dispatch({
            type:'file',
            payload: ref
        })
        callback()
    }
}

export const setSID = (sid, callback)=>{
    return (dispatch)=>{
        dispatch({
            type:'sid',
            payload: sid
        })
        callback()
    }
}