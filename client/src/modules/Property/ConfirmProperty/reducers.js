import {
  ACTIVATE_CERTIFICATE_REQUEST,
  ACTIVATE_CERT_WAIT_BLOCKCHAIN_CONFIRM,
  ACTIVATE_CERTIFICATE_SUCCESS,
  ACTIVATE_CERTIFICATE_FAILURE,
} from "./constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  loading: false,
  error: "",
};

export default function propertyPendingReducer(state = initialState, action) {
  switch (action.type) {
    case ACTIVATE_CERTIFICATE_REQUEST:
      return { ...state, loading: true };
    case ACTIVATE_CERT_WAIT_BLOCKCHAIN_CONFIRM:
      toast("Đang xác nhận tài sản...", {
        type: toast.TYPE.INFO,
        toastId: action.payload,
        autoClose: false,
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return { ...state, loading: true };
    case ACTIVATE_CERTIFICATE_SUCCESS:
      toast.update(action.payload.txHash, {
        render: "Xác nhận tài sản tài sản thành công!",
        type: toast.TYPE.SUCCESS,
        autoClose: 5000,
        onClick: () => {
          action.payload.history.push(`/my-properties`);
        },
      });
      return { ...state, loading: false };
    case ACTIVATE_CERTIFICATE_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
