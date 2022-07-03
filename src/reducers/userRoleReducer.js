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

const initialState = {
  isLoad: true,
  rowsPerPage: 5,
  page: 0,
  userRoleList: [],
  userRole: {},
};

const getPage = (array, rowsPerPage, page) => {
  return array.length
    ? rowsPerPage * page > array.length - 1
      ? Math.ceil(array.length / rowsPerPage) - 1
      : page
    : 0;
};

const userRoleReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ROLE_FETCH_ALL:
      return {
        ...state,
        isLoad: false,
        userRole: {},
        userRoleList: payload,
        page: getPage(payload, state.rowsPerPage, state.page),
      };
    case USER_ROLE_DELETE:
      return {
        ...state,
        isLoad: false,
        userRole: {},
        userRoleList: payload,
        page: getPage(payload, state.rowsPerPage, state.page),
      };
    case USER_ROLE_ADD:
    case USER_ROLE_FETCH_ONE:
    case USER_ROLE_UPDATE:
      return {
        ...state,
        isLoad: false,
        userRole: payload.userRole,
      };
    case USER_ROLE_CHANGE_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: payload.rowsPerPage,
        page: payload.page,
      };
    case USER_ROLE_CHANGE_PAGE:
      return {
        ...state,
        page: payload,
      };
    case USER_ROLE_UNLOAD:
      return {
        ...state,
        userRoleList: [],
        userRole: {},
      };
    default:
      return state;
  }
};

export default userRoleReducer;
