import { INIT_CONTRACT_SUCCESS, INIT_TRANSACTION_FAILURE } from "./constants";
const initialState = {
  roleBasedAcl: "",
  realEstate: "",
  transaction: "",
};

export default function initContractReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_CONTRACT_SUCCESS:
      return {
        ...state,
        realEstate: action.payload.realEstateContract,
        transaction: action.payload.transactionContract,
      };
    case INIT_TRANSACTION_FAILURE:
      return state;
    default:
      return state;
  }
}
