import { LOGOUT } from "../actions/types";

import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import commonReducer from "./commonReducer";
import authReducer from "./authReducer";
import userReducer from "./userReducer";
import userRoleReducer from "./userRoleReducer";
import kindPurposeReducer from "./kindPurposeReducer";
import terstructureReducer from "./terstructureReducer";

/*
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};
*/

const userPersistConfig = {
  key: "user",
  storage: storage,
  whitelist: ["searchString", "showIsDeleted", "rowsPerPage", "page"],
};

const appReducer = combineReducers({
  auth: authReducer,
  common: commonReducer,
  user: persistReducer(userPersistConfig, userReducer),
  userRole: userRoleReducer,
  kindPurpose: kindPurposeReducer,
  terstructure: terstructureReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    storage.removeItem("persist:user");

    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;
