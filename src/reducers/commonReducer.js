import { SNACKBAR_SHOW, SNACKBAR_HIDE } from "../actions/types";

const initialState = {
  snackBarShow: false,
  snackBarMessage: "",
  snackBarSeverity: "success",
};

const commonReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SNACKBAR_SHOW:
      return {
        ...state,
        snackBarShow: true,
        snackBarMessage: payload.message,
        snackBarSeverity: payload.severity,
      };
    case SNACKBAR_HIDE:
      return {
        ...state,
        snackBarShow: false,
        snackBarMessage: "",
      };
    default:
      return state;
  }
};

export default commonReducer;
