const reducer = (state=localStorage.getItem("docster_type")?localStorage.getItem("docster_type"):"default",action)=>{
    if(action.type ==='file'){
        return action.payload
    }
    else{
        return state;
    }
}

export default reducer;