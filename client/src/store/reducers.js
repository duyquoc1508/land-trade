import { combineReducers } from "redux";
import login from "../modules/Login/reducers";
import addProperty from "../modules/Property/AddProperty/reducers";
import user from "../modules/Profile/EditProfile/reducers";
import listingSale from "../modules/Listings/reducers";
import myListing from "../modules/Property/ListProperties/reducers";
import notifications from "../components/Header/Notifications/reducers";
import propertyPending from "../modules/Property/PropertyPending/reducers";
import propertyDetail from "../modules/Property/PropertyDetail/reducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  login,
  user,
  addProperty,
  myListing,
  listingSale,
  notifications,
  propertyPending,
  propertyDetail,
  form: formReducer,
});

export default rootReducer;
