import { combineReducers } from "redux";
import login from "../modules/Login/reducers";
import addProperty from "../modules/Property/AddProperty/reducers";
import user from "../modules/Profile/EditProfile/reducers";
import listingSale from "../modules/Listings/reducers";
import myListing from "../modules/Property/ListProperties/reducers";
import notifications from "../components/Header/Notifications/reducers";
import confirmProperty from "../modules/Property/ConfirmProperty/reducers";
import propertyStandard from "../modules/Property/PropertyStandard/reducers";
import shared from "../modules/Shared/reducers";
import propertySelling from "../modules/Property/PropertySelling/reducers";
import propertyActivated from "../modules/Property/PropertyActivated/reducers";
import initTransaction from "../modules/InitTransaction/reducers";
import transaction from "../modules/Transaction/reducers";
import header from "../components/Header/reducers";
import role from "../modules/Role/reducers";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  login,
  user,
  addProperty,
  myListing,
  listingSale,
  notifications,
  confirmProperty,
  propertyStandard,
  shared,
  propertySelling,
  propertyActivated,
  initTransaction,
  transaction,
  header,
  role,
  form: formReducer,
});

export default rootReducer;
