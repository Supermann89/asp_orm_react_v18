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

const initialState = {
  isLoad: true,
  rowsPerPage: 5,
  page: 0,
  kindPurposeList: [],
  kindPurpose: {},
};

const getPage = (array, rowsPerPage, page) => {
  return array.length
    ? rowsPerPage * page > array.length - 1
      ? Math.ceil(array.length / rowsPerPage) - 1
      : page
    : 0;
};

const kindPurposeReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case KIND_PURPOSE_FETCH_ALL:
      return {
        ...state,
        isLoad: false,
        kindPurpose: {},
        kindPurposeList: payload,
        page: getPage(payload, state.rowsPerPage, state.page),
      };
    case KIND_PURPOSE_DELETE:
      return {
        ...state,
        isLoad: false,
        kindPurpose: {},
        kindPurposeList: payload,
        page: getPage(payload, state.rowsPerPage, state.page),
      };
    case KIND_PURPOSE_ADD:
      return {
        ...state,
        isLoad: false,
        kindPurpose: payload,
        page: getPage(payload, state.rowsPerPage, state.page),
      };
    case KIND_PURPOSE_FETCH_ONE:
    case KIND_PURPOSE_UPDATE:
      return {
        ...state,
        isLoad: false,
        kindPurpose: payload,
      };
    case KIND_PURPOSE_CHANGE_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: payload.rowsPerPage,
        page: payload.page,
      };
    case KIND_PURPOSE_CHANGE_PAGE:
      return {
        ...state,
        page: payload,
      };
    case KIND_PURPOSE_UNLOAD:
      return {
        ...state,
        kindPurposeList: [],
        kindPurpose: {},
      };
    default:
      return state;
  }
};

export default kindPurposeReducer;
