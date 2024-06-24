import { combineReducers } from "redux";

import fileReducer from "./filetype";
import sidReducer from "./sid"

const reducers = combineReducers({
    type : fileReducer,
    sid : sidReducer
})

export default reducers