import { GET_MOVIES_POPULAR } from "../config/constant";

const initialState = {
  dataPopular: [],
  isLoading: false,
  error: false
};

export const getPopular = (state = initialState, action) => {
  switch (action.type) {
    case `${GET_MOVIES_POPULAR}_PENDING`:
      return {
        ...state,
        isLoading: true
      };

    case `${GET_MOVIES_POPULAR}_FULFILLED`:
      return {
        ...state,
        isLoading: false,
        dataPopular: action.payload.data.results
      };
    case `${GET_MOVIES_POPULAR}_REJECTED`:
      return {
        ...state,
        isLoading: false,
        error: true
      };

    default:
      return state;
  }
};
