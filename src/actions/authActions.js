import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_START_REFRESH,
  LOGIN_REFRESH,
  LOGIN_FAIL,
  LOGOUT,
  PASSWORD_REFRESH,
  PASSWORD_RESET,
  AUTH_ERROR_CLEAR,
} from "./types";

import User from "../api/user";
import { setCookie } from "../utils/cookie";

export const signup = (fio, email, password, passwordConfirm) => async (
  dispatch
) => {
  const data = await User.signup(fio, email, password, passwordConfirm);
  if (data.user) {
    return dispatch({
      type: REGISTER_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: REGISTER_FAIL,
      payload: data,
    });
  }
};

export const login = (username, password) => async (dispatch) => {
  const data = await User.login(username, password);

  if (data.user) {
    // +10 дней от текущей даты
    let expires = new Date(Date.now() + 864000e3);
    setCookie(
      "user",
      JSON.stringify({ email: data.user.email, fio: data.user.fio }),
      { expires }
    );

    return dispatch({
      type: LOGIN_SUCCESS,
      payload: data,
    });
  } else {
    return dispatch({
      type: LOGIN_FAIL,
      payload: data,
    });
  }
};

export const isAuth = () => async (dispatch) => {
  dispatch({
    type: LOGIN_START_REFRESH,
  });

  const { user } = await User.getUserIfAuth();

  if (user) {
    return dispatch({
      type: LOGIN_REFRESH,
      payload: {
        user,
      },
    });
  }
  //else will logout
};

export const clearErrorMessage = () => async (dispatch) => {
  return dispatch({
    type: AUTH_ERROR_CLEAR,
  });
};

export const changePassword = (
  password,
  passwordConfirm,
  passwordCurrent
) => async (dispatch) => {
  const data = await User.changePassword(
    password,
    passwordConfirm,
    passwordCurrent
  );

  return dispatch({
    type: PASSWORD_REFRESH,
    payload: data,
  });
};

export const resetPassword = (token, password, passwordConfirm) => async (
  dispatch
) => {
  const data = await User.resetPassword(token, password, passwordConfirm);

  return dispatch({
    type: PASSWORD_RESET,
    payload: data,
  });
};

export const logout = () => async (dispatch) => {
  await User.logout();

  dispatch({
    type: LOGOUT,
  });
};
