import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      toast("Đang khởi tạo giao dịch...", {
        type: toast.TYPE.INFO,
        toastId: action.payload,
        autoClose: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...state, loading: true };
    case INIT_TRANSACTION_SUCCESS:
      toast.update(action.payload.txHash, {
        render: "Khởi tạo giao dịch thành công.",
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
