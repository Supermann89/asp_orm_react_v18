import {
  USER_FETCH_ALL,
  USER_FETCH_ONE,
  USER_ADD,
  USER_UPDATE,
  USER_UNLOAD,
  USER_CHANGE_ROWS_PER_PAGE,
  USER_CHANGE_PAGE,
  USER_SEARCH_CHANGE,
  USER_SET_IS_DELETED,
} from "../actions/types";

import {
  _createRegExpFilter,
  _searchFilter,
} from "../components/admin/Table/utils";

const initialState = {
  userList: [],
  userListFiltered: [],
  searchibleFields: [], // settigs after 1st fetchign user list
  searchString: "",
  showIsDeleted: -1,
  rowsPerPage: 5,
  page: 0,
  user: {},
};

const getUserWithFilters = (
  users,
  searchibleFields,
  searchString,
  isDeleted
) => {
  let filterRegExp = _createRegExpFilter(searchString);

  //isDeleted -1 -Все, 0 - не удалённые, 1 - удалённые
  const isDeletedFilter = (users, isDeleted) => {
    if (isDeleted === -1) return users;
    return users.filter((user) => (user.is_deleted || 0) === isDeleted);
  };

  let newUsers = isDeletedFilter(
    _searchFilter(users, searchibleFields, filterRegExp),
    isDeleted
  );

  return newUsers;
};

const getPage = (array, rowsPerPage, page) => {
  return array.length
    ? rowsPerPage * page > array.length - 1
      ? Math.ceil(array.length / rowsPerPage) - 1
      : page
    : 0;
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  let newUserList = [];

  switch (type) {
    case USER_FETCH_ALL:
      newUserList = getUserWithFilters(
        payload.userList,
        payload.searchibleFields,
        state.searchString,
        state.showIsDeleted
      );

      return {
        ...state,
        searchibleFields: payload.searchibleFields,
        user: {},
        userList: payload.userList,
        userListFiltered: newUserList,
        page: getPage(newUserList, state.rowsPerPage, state.page),
      };
    case USER_SET_IS_DELETED:
      newUserList = getUserWithFilters(
        state.userList,
        state.searchibleFields,
        state.searchString,
        parseInt(payload)
      );

      return {
        ...state,
        user: {},
        userListFiltered: newUserList,
        showIsDeleted: payload,
        page: getPage(newUserList, state.rowsPerPage, state.page),
      };
    case USER_SEARCH_CHANGE:
      newUserList = getUserWithFilters(
        state.userList,
        state.searchibleFields,
        payload,
        state.showIsDeleted
      );

      return {
        ...state,
        user: {},
        userListFiltered: newUserList,
        searchString: payload,
        page: getPage(newUserList, state.rowsPerPage, state.page),
      };

    case USER_ADD:
      return {
        ...state,
        user: payload?.user || {},
      };
    case USER_FETCH_ONE:
    case USER_UPDATE:
      return {
        ...state,
        user: payload,
      };
    case USER_CHANGE_ROWS_PER_PAGE:
      return {
        ...state,
        rowsPerPage: payload.rowsPerPage,
        page: payload.page,
      };
    case USER_CHANGE_PAGE:
      return {
        ...state,
        page: payload,
      };
    case USER_UNLOAD:
      return {
        ...state,
        userList: [],
        userListFiltered: [],
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
