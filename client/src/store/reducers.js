import { combineReducers } from "redux";
import login from "../modules/Login/reducers";
import addProperty from "../modules/Property/AddProperty/reducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({ login, addProperty, form: formReducer });

export default rootReducer;
