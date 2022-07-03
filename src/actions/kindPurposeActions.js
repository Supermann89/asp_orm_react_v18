import {
  KIND_PURPOSE_FETCH_ALL,
  KIND_PURPOSE_FETCH_ONE,
  KIND_PURPOSE_ADD,
  KIND_PURPOSE_UPDATE,
  KIND_PURPOSE_DELETE,
  KIND_PURPOSE_CHANGE_ROWS_PER_PAGE,
  KIND_PURPOSE_CHANGE_PAGE,
  KIND_PURPOSE_UNLOAD,
} from "../actions/types";

import KindPurposeApi from "../api/kindPurpose";

export const getAll = () => async (dispatch) => {
  const data = await KindPurposeApi.getAll();

  return dispatch({
    type: KIND_PURPOSE_FETCH_ALL,
    payload: data,
  });
};

export const getById = (id) => async (dispatch) => {
  const data = await KindPurposeApi.getById(id);

  return dispatch({
    type: KIND_PURPOSE_FETCH_ONE,
    payload: data,
  });
};

export const create = (name) => async (dispatch) => {
  const data = await KindPurposeApi.create(name);
  return dispatch({
    type: KIND_PURPOSE_ADD,
    payload: data,
  });
};

export const updateById = (kindPurpose) => async (dispatch) => {
  const data = await KindPurposeApi.updateById(kindPurpose);

  return dispatch({
    type: KIND_PURPOSE_UPDATE,
    payload: data,
  });
};

export const deleteSome = (ids) => async (dispatch) => {
  const response = await KindPurposeApi.delete(ids);
  let data = [];
  if (response.status === 204) data = await KindPurposeApi.getAll();
  return dispatch({
    type: KIND_PURPOSE_DELETE,
    payload: data,
  });
};

export const changePage = (page) => (dispatch) => {
  return dispatch({
    type: KIND_PURPOSE_CHANGE_PAGE,
    payload: page,
  });
};

export const changeRowsPerPage = (rowsPerPage, page) => (dispatch) => {
  return dispatch({
    type: KIND_PURPOSE_CHANGE_ROWS_PER_PAGE,
    payload: { rowsPerPage, page },
  });
};

export const clear = () => (dispatch) => {
  return dispatch({
    type: KIND_PURPOSE_UNLOAD,
  });
};
