import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastLoading from "../../../components/ToastCustom/ToastLoading";
import ToastSuccess from "../../../components/ToastCustom/ToastSuccess";

import {
  FILLING_FORM,
  CREATE_REQUESTING,
  CREATE_SUCCESS,
  CREATE_ERROR,
  CREATE_CERT_WAIT_BLOCKCHAIN_CONFIRM,
} from "./constants";

const initialState = {
  success: false,
  loading: false,
  messages: "",
  data: {
    owners: [],
    properties: {
      landLot: null,
      house: null,
      otherConstruction: "",
      prodForestIsArtificial: "",
      perennialTree: "",
      notice: "",
    },
    images: [],
  },
};

function createReducer(state = initialState, action) {
  switch (action.type) {
    case FILLING_FORM:
      state.messages = "Yêu cầu nhập thông tin";
      if (
        action.data.hasOwnProperty("owners") &&
        action.data.owners.hasOwnProperty("values")
      )
        state.data.owners = action.data.owners.values.publicAddress;
      if (
        action.data.hasOwnProperty("land") &&
        action.data.land.hasOwnProperty("values")
      )
        state.data.properties.landLot = action.data.land.values;
      if (
        action.data.hasOwnProperty("house") &&
        action.data.house.hasOwnProperty("values")
      )
        state.data.properties.house = action.data.house.values;
      if (
        action.data.hasOwnProperty("construction") &&
        action.data.construction.hasOwnProperty("values")
      )
        state.data.properties.otherConstruction =
          action.data.construction.values.otherConstruction;
      if (
        action.data.hasOwnProperty("forest") &&
        action.data.forest.hasOwnProperty("values")
      )
        state.data.properties.prodForestIsArtificial =
          action.data.forest.values.prodForestIsArtificial;
      if (
        action.data.hasOwnProperty("tree") &&
        action.data.tree.hasOwnProperty("values")
      )
        state.data.properties.perennialTree =
          action.data.tree.values.perennialTree;
      if (
        action.data.hasOwnProperty("note") &&
        action.data.note.hasOwnProperty("values")
      )
        state.data.properties.notice = action.data.note.values.notice;
      if (
        action.data.hasOwnProperty("upload") &&
        action.data.upload.hasOwnProperty("values")
      )
        state.data.images = action.data.upload.values.images;
      return state;
    case CREATE_REQUESTING: {
      return { ...state, loading: true };
    }
    case CREATE_SUCCESS:
      toast.update(action.payload.txHash, {
        render: <ToastSuccess message={"Tạo tài sản thành công!"} />,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        onClick: () => {
          action.payload.history.push(
            `/property-standard/${action.payload.txHash}`
          );
        },
      });
      return {
        ...state,
        success: false,
        loading: false,
      };
    case CREATE_CERT_WAIT_BLOCKCHAIN_CONFIRM:
      toast(<ToastLoading message={"Đang tạo tài sản..."} />, {
        toastId: action.payload,
        autoClose: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...initialState, loading: true, success: true };
    case CREATE_ERROR:
      return {
        ...state,
        success: false,
        loading: false,
        message: action.payload,
      };
    default:
      return state;
  }
}

export default createReducer;
