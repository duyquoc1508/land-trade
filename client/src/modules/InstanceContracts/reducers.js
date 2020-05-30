import { INIT_CONTRACT_SUCCESS, LOGIN_SUCCESS } from "./constants"
const initialState = {
  roleBasedAcl: '',
  realEstate: ''
}

export default function initContractReducer(state = initialState, action) {
  switch (action.type) {
    case INIT_CONTRACT_SUCCESS:
      return {
        ...state,
        realEstate: action.payload.realEstate
      }
    default:
      return state
  }
}
