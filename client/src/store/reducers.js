import { combineReducers } from "redux";
import login from "../pages/Login/reducers";
import addProperty from "../pages/AddProperty/reducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({ login, addProperty, form: formReducer });

export default rootReducer;
