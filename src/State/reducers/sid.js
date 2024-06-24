// localStorage.getItem('Docschat_msg')?JSON.parse(localStorage.getItem("Docschat_msg"))[0].sid:"default"
const sidReducer = (state= localStorage.getItem("Docschat_sid")?localStorage.getItem("Docschat_sid"):"default",action)=>{
    if(action.type ==='sid'){
        return action.payload
    }
    else{
        return state;
    }
}

export default sidReducer;