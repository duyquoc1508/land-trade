import {
  INIT_CONTRACT_SUCCESS,
  INIT_CONTRACT_FAILURE,
  GET_COINBASE_BALANCE_SUCCESS,
  GET_COINBASE_BALANCE_FAILURE,
  GET_ETH_PRICE_SUCCESS,
  GET_ETH_PRICE_FAILURE,
  FETCH_USER_PROFILE_FAILURE,
} from "./constants";

const initialState = {
  roleBasedAcl: "",
  realEstate: "",
  transaction: "",
  web3: "",
  ethToVndPrice: 5000000, //suppose: 1ETH => 5000000VND
  accountBalance: 0,
  error: "",
};

export default function sharedReducers(state = initialState, action) {
  switch (action.type) {
    case INIT_CONTRACT_SUCCESS:
      return {
        ...state,
        roleBasedAcl: action.payload.roleBasedContract,
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
    case FETCH_USER_PROFILE_FAILURE:
      return { ...state, error: action.payload };
    default:
      return state;
  }
}
