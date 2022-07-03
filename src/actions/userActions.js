import {
  USER_FETCH_ALL,
  USER_FETCH_ONE,
  USER_ADD,
  USER_UPDATE,
  USER_CHANGE_ROWS_PER_PAGE,
  USER_CHANGE_PAGE,
  USER_UNLOAD,
  USER_SEARCH_CHANGE,
  USER_SET_IS_DELETED,
} from "../actions/types";

import UserApi from "../api/user";

export const getAll = (searchibleFields) => async (dispatch) => {
  const data = await UserApi.getAll();

  return dispatch({
    type: USER_FETCH_ALL,
    payload: {
      userList: data,
      searchibleFields,
    },
  });
};

export const clear = () => (dispatch) => {
  return dispatch({
    type: USER_UNLOAD,
  });
};

export const getById = (id) => async (dispatch) => {
  const data = await UserApi.getById(id);

  return dispatch({
    type: USER_FETCH_ONE,
    payload: data,
  });
};

export const create = (fio, email, roles) => async (dispatch) => {
  const data = await UserApi.create(fio, email, roles);

  return dispatch({
    type: USER_ADD,
    payload: data,
  });
};

export const updateById = (user) => async (dispatch) => {
  const data = await UserApi.updateById(user);

  return dispatch({
    type: USER_UPDATE,
    payload: data,
  });
};

export const changePage = (page) => (dispatch) => {
  return dispatch({
    type: USER_CHANGE_PAGE,
    payload: page,
  });
};

export const changeRowsPerPage = (rowsPerPage, page) => (dispatch) => {
  return dispatch({
    type: USER_CHANGE_ROWS_PER_PAGE,
    payload: { rowsPerPage, page },
  });
};

export const changeSearchString = (page) => (dispatch) => {
  return dispatch({
    type: USER_SEARCH_CHANGE,
    payload: page,
  });
};

export const changeIsDeleted = (isDeleted) => (dispatch) => {
  return dispatch({
    type: USER_SET_IS_DELETED,
    payload: isDeleted,
  });
};
