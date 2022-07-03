import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REFRESH,
  LOGIN_START_REFRESH,
  LOGIN_FAIL,
  LOGOUT,
  PASSWORD_REFRESH,
  PASSWORD_RESET,
  AUTH_ERROR_CLEAR,
} from "../actions/types";

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
  message: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        isLoggedIn: false,
        user: payload.user,
        message: "",
      };
    case REGISTER_FAIL:
      return {
        isLoggedIn: false,
        user: null,
        message: payload.message,
      };
    case LOGIN_START_REFRESH:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_REFRESH:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: payload.user,
        message: "",
      };
    case LOGIN_SUCCESS:
      return {
        isLoading: false,
        isLoggedIn: true,
        user: payload.user,
        message: "",
      };
    case LOGIN_FAIL:
      return {
        isLoading: false,
        isLoggedIn: false,
        user: null,
        message: payload.message,
      };

    case LOGOUT:
      return {
        isLoading: false,
        isLoggedIn: false,
        user: null,
        message: "",
      };
    case PASSWORD_REFRESH:
      return {
        ...state,
        message: payload.message,
      };
    case PASSWORD_RESET:
      return {
        isLoggedIn: payload.user ? true : false,
        user: payload.user,
        message: payload.message,
      };
    case AUTH_ERROR_CLEAR:
      return {
        ...state,
        message: "",
      };
    default:
      return state;
  }
};

export default authReducer;
