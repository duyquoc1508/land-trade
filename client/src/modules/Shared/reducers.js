import {
  INIT_CONTRACT_SUCCESS,
  INIT_CONTRACT_FAILURE,
  GET_COINBASE_BALANCE_SUCCESS,
  GET_COINBASE_BALANCE_FAILURE,
  GET_ETH_PRICE_SUCCESS,
  GET_ETH_PRICE_FAILURE,
} from "./constants";

const initialState = {
  roleBasedAcl: "",
  realEstate: "",
  transaction: "",
  web3: "",
  ethToVndPrice: 5230289, // price at 7/4/2020
  accountBalance: 0,
  error: "",
};

export default function sharedReducers(state = initialState, action) {
  switch (action.type) {
    case INIT_CONTRACT_SUCCESS:
      return {
        ...state,
        realEstate: action.payload.realEstateContract,
        transaction: action.payload.transactionContract,
        web3: action.payload.web3,
      };
    case GET_ETH_PRICE_SUCCESS:
      return {
        ...state,
        ethToVndPrice: action.payload,
      };
    case GET_COINBASE_BALANCE_SUCCESS:
      return { ...state, accountBalance: action.payload };
    case INIT_CONTRACT_FAILURE:
    case GET_COINBASE_BALANCE_FAILURE:
    case GET_ETH_PRICE_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
