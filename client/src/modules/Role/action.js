import {
  ADD_ROLE_REQUEST,
  REMOVE_ROLE_REQUEST,
  ROLE_CHANGED,
} from "./constants";

export function addRoleRequest(data) {
  return {
    type: ADD_ROLE_REQUEST,
    payload: data,
  };
}

export function removeRoleRequest(data) {
  return {
    type: REMOVE_ROLE_REQUEST,
    payload: data,
  };
}

export function roleChanged() {
  return {
    type: ROLE_CHANGED,
  };
}
