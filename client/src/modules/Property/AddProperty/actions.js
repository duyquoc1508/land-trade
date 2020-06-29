import { FILLING_FORM, CREATE_REQUESTING, CREATE_SUCCESS } from "./constants";

export function fillForm(data) {
  return {
    type: FILLING_FORM,
    data,
  };
}

export function requestCreate(property) {
  return {
    type: CREATE_REQUESTING,
    property,
  };
}

export function createSuccess({ history, txHash }) {
  return { type: CREATE_SUCCESS, payload: { history, txHash } };
}
