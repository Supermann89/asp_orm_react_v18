import {
  TERSTRUCTURE_UNLOAD,
  TERSTRUCTURE_FETCH_ONE,
  TERSTRUCTURE_FETCH_ALL,
  TERSTRUCTURE_UPDATE,
  TERSTRUCTURE_ADD,
} from "../actions/types";

const initialState = {
  isLoad: true,
  terstructureList: [],
  terstructure: {},
};

const terstructureReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TERSTRUCTURE_FETCH_ALL:
      return {
        ...state,
        isLoad: false,
        terstructure: {},
        terstructureList: payload,
      };
    case TERSTRUCTURE_ADD:
    case TERSTRUCTURE_UPDATE:
    case TERSTRUCTURE_FETCH_ONE:
      return {
        ...state,
        isLoad: false,
        terstructure: payload,
      };
    case TERSTRUCTURE_UNLOAD:
      return {
        ...state,
        terstructureList: [],
        terstructure: {},
      };
    default:
      return state;
  }
};

export default terstructureReducer;
