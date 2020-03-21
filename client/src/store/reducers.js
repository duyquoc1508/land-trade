import { combineReducers } from "redux";
import login from "../modules/Login/reducers";
import addProperty from "../modules/Property/AddProperty/reducers";
import user from "../modules/Profile/EditProfile/reducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  login,
  user,
  addProperty,
  form: formReducer
});

export default rootReducer;
