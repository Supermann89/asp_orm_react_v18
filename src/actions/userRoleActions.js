import {
  USER_ROLE_FETCH_ALL,
  USER_ROLE_FETCH_ONE,
  USER_ROLE_ADD,
  USER_ROLE_UPDATE,
  USER_ROLE_DELETE,
  USER_ROLE_CHANGE_ROWS_PER_PAGE,
  USER_ROLE_CHANGE_PAGE,
  USER_ROLE_UNLOAD,
} from "../actions/types";

import UserRoleApi from "../api/userRole";

export const getAll = () => async (dispatch) => {
  const data = await UserRoleApi.getAll();

  return dispatch({
    type: USER_ROLE_FETCH_ALL,
    payload: data,
  });
};

export const getById = (id) => async (dispatch) => {
  const data = await UserRoleApi.getById(id);

  return dispatch({
    type: USER_ROLE_FETCH_ONE,
    payload: data,
  });
};

export const create = (name) => async (dispatch) => {
  const data = await UserRoleApi.create(name);

  return dispatch({
    type: USER_ROLE_ADD,
    payload: data,
  });
};

export const updateById = (userRole) => async (dispatch) => {
  const data = await UserRoleApi.updateById(userRole);

  return dispatch({
    type: USER_ROLE_UPDATE,
    payload: data,
  });
};

export const deleteSome = (ids) => async (dispatch) => {
  const response = await UserRoleApi.delete(ids);
  let data = [];
  if (response.status === 204) data = await UserRoleApi.getAll();
  return dispatch({
    type: USER_ROLE_DELETE,
    payload: data,
  });
};

export const changePage = (page) => (dispatch) => {
  return dispatch({
    type: USER_ROLE_CHANGE_PAGE,
    payload: page,
  });
};

export const changeRowsPerPage = (rowsPerPage, page) => (dispatch) => {
  return dispatch({
    type: USER_ROLE_CHANGE_ROWS_PER_PAGE,
    payload: { rowsPerPage, page },
  });
};

export const clear = () => (dispatch) => {
  return dispatch({
    type: USER_ROLE_UNLOAD,
  });
};
