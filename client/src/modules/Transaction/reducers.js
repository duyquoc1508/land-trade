import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastLoading from "../../components/ToastCustom/ToastLoading";
import ToastSuccess from "../../components/ToastCustom/ToastSuccess";
import {
  FETCH_TRANSACTION_REQUEST,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_FAILURE,
  FETCH_TRADING_PROPERTY_SUCCESS,
  CANCEL_TRANSACTION_REQUEST,
  CANCEL_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
  CANCEL_TRANSACTION_SUCCESS,
  CANCEL_TRANSACTION_FAILURE,
  ACCEPT_TRANSACTION_REQUEST,
  ACCEPT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
  ACCEPT_TRANSACTION_SUCCESS,
  ACCEPT_TRANSACTION_FAILURE,
  CONFIRM_TRANSACTION_REQUEST,
  CONFIRM_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
  CONFIRM_TRANSACTION_SUCCESS,
  CONFIRM_TRANSACTION_FAILURE,
  PAYMENT_REQUEST,
  PAYMENT_WAIT_BLOCKCHAIN_CONFIRM,
  PAYMENT_SUCCESS,
  PAYMENT_FAILURE,
} from "./constants";

const initialState = {
  data: "",
  property: "",
  loading: false,
  error: "",
  reload: false, // if transaction success => change reload
};

export default function transactionReducers(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case FETCH_TRANSACTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_TRADING_PROPERTY_SUCCESS:
      return {
        ...state,
        property: action.payload,
      };

    case CANCEL_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case CANCEL_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM:
      toast(<ToastLoading message={"Đang hủy bỏ giao dịch..."} />, {
        toastId: action.payload,
        autoClose: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...state, loading: true };
    case CANCEL_TRANSACTION_SUCCESS:
      toast.update(action.payload, {
        render: <ToastSuccess message={"Hủy bỏ giao dịch thành công"} />,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        onClick: () => {
          action.payload.history.push(`/transaction/${action.payload.txHash}`);
        },
      });
      return { ...state, reload: !state.reaload, loading: false };

    case ACCEPT_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case ACCEPT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM:
      toast(<ToastLoading message={"Đang xác nhận giao dịch..."} />, {
        toastId: action.payload,
        autoClose: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...state, loading: true };
    case ACCEPT_TRANSACTION_SUCCESS:
      toast.update(action.payload, {
        render: <ToastSuccess message={"Khởi tạo giao dịch thành công!"} />,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        onClick: () => {
          action.payload.history.push(`/transaction/${action.payload.txHash}`);
        },
      });
      return { ...state, reload: !state.reload, loading: false };

    case PAYMENT_REQUEST:
      return { ...state, loading: true };
    case PAYMENT_WAIT_BLOCKCHAIN_CONFIRM:
      toast(<ToastLoading message={"Đang xác nhận giao dịch..."} />, {
        toastId: action.payload,
        autoClose: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...state, loading: true };
    case PAYMENT_SUCCESS:
      toast.update(action.payload, {
        render: <ToastSuccess message={"Giao dịch thành công!"} />,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        onClick: () => {
          action.payload.history.push(`/transaction/${action.payload.txHash}`);
        },
      });
      return { ...state, reload: !state.reload, loading: false };

    case CONFIRM_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case CONFIRM_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM:
      toast(<ToastLoading message={"Đang xác nhận giao dịch..."} />, {
        toastId: action.payload,
        autoClose: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...state, loading: true };
    case CONFIRM_TRANSACTION_SUCCESS:
      toast.update(action.payload, {
        render: <ToastSuccess message={"Giao dịch thành công!"} />,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        onClick: () => {
          action.payload.history.push(`/transaction/${action.payload.txHash}`);
        },
      });
      return { ...state, reload: !state.reload, loading: false };

    default:
      return state;
  }
}
