// import React from "react";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import ToastLoading from "../../../components/ToastCustom/ToastLoading";
// import ToastSuccess from "../../../components/ToastCustom/ToastSuccess";

import {
  ADD_ROLE_REQUEST,
  ADD_ROLE_WAIT_BLOCKCHAIN_CONFIRM,
  ADD_ROLE_SUCCESS,
  ADD_ROLE_FAILURE,
  REMOVE_ROLE_REQUEST,
  REMOVE_ROLE_WAIT_BLOCKCHAIN_CONFIRM,
  REMOVE_ROLE_SUCCESS,
  REMOVE_ROLE_FAILURE,
  ROLE_CHANGED,
} from "./constants";

const initialState = {
  loading: false,
  messages: "",
};

function roleReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ADD_ROLE_WAIT_BLOCKCHAIN_CONFIRM:
      return { ...state, loading: true };
    case ADD_ROLE_FAILURE:
      return {
        loading: false,
        message: action.payload,
      };

    case REMOVE_ROLE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case REMOVE_ROLE_WAIT_BLOCKCHAIN_CONFIRM:
      return { ...state, loading: true };
    case REMOVE_ROLE_FAILURE:
      return {
        loading: false,
        message: action.payload,
      };
    case ROLE_CHANGED:
      return {
        loading: false,
      };
    default:
      return state;
  }
}

export default roleReducer;
