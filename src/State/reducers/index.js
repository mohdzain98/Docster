import { combineReducers } from "redux";

import filetype from "./filetype";

const reducers = combineReducers({
    type : filetype
})

export default reducers