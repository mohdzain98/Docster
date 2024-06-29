const fileReducer = (state=localStorage.getItem("Docschat_type")?localStorage.getItem("Docschat_type"):"default",action)=>{
    if(action.type ==='file'){
        return action.payload
    }
    else{
        return state;
    }
}

export default fileReducer;