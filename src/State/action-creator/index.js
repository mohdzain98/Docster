export const changeFile = (ref, callback) =>{
    return (dispatch)=>{
        dispatch({
            type:'file',
            payload: ref
        })
        callback()
    }
}