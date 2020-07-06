import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastLoading from "../../components/ToastCustom/ToastLoading";
import ToastSuccess from "../../components/ToastCustom/ToastSuccess";
import {
  INIT_TRANSACTION_REQUEST,
  INIT_TRANSACTION_SUCCESS,
  INIT_TRANSACTION_FAILURE,
  INIT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM,
} from "./constants";

const initialState = {
  loading: false,
  error: "",
  data: "",
};

export default function initTransactionReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_TRANSACTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case INIT_TRANSACTION_WAIT_BLOCKCHAIN_CONFIRM:
      toast(<ToastLoading message={"Đang khởi tạo giao dịch..."} />, {
        toastId: action.payload,
        autoClose: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...state, loading: true };
    case INIT_TRANSACTION_SUCCESS:
      toast.update(action.payload.txHash, {
        render: <ToastSuccess message={"Khởi tạo giao dịch thành công!"} />,
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        onClick: () => {
          action.payload.history.push(`/transaction/${action.payload.txHash}`);
        },
      });
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case INIT_TRANSACTION_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
}
