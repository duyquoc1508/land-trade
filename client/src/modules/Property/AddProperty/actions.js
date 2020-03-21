import { FILLING_FORM, CREATE_REQUESTING } from "./constants";

export function fillForm(data) {
  return {
    type: FILLING_FORM,
    data
  };
}

export function requestCreate(property) {
  return {
    type: CREATE_REQUESTING,
    property
  };
}
