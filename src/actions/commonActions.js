import { SNACKBAR_SHOW, SNACKBAR_HIDE } from "./types";

export const snackBarShow = (severity, message) => (dispatch) => {
  return dispatch({
    type: SNACKBAR_SHOW,
    payload: { severity, message },
  });
};

export const snackBarHide = () => (dispatch) => {
  return dispatch({
    type: SNACKBAR_HIDE,
  });
};
