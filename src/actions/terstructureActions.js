import {
  TERSTRUCTURE_UPDATE,
  TERSTRUCTURE_FETCH_ALL,
  TERSTRUCTURE_FETCH_ONE,
  TERSTRUCTURE_UNLOAD,
  TERSTRUCTURE_ADD,
} from "../actions/types";

import TerstructureApi from "../api/terstructure";

export const getAll = () => async (dispatch) => {
  const data = await TerstructureApi.getAll();

  return dispatch({
    type: TERSTRUCTURE_FETCH_ALL,
    payload: data,
  });
};

export const create = (terstructure) => async (dispatch) => {
  const data = await TerstructureApi.create(terstructure);
  return dispatch({
    type: TERSTRUCTURE_ADD,
    payload: data,
  });
};

export const getById = (id) => async (dispatch) => {
  const data = await TerstructureApi.getById(id);

  return dispatch({
    type: TERSTRUCTURE_FETCH_ONE,
    payload: data,
  });
};

export const updateById = (terstructure) => async (dispatch) => {
  const data = await TerstructureApi.updateById(terstructure);

  return dispatch({
    type: TERSTRUCTURE_UPDATE,
    payload: data,
  });
};

export const clear = () => (dispatch) => {
  return dispatch({
    type: TERSTRUCTURE_UNLOAD,
  });
};
