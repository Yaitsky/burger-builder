import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  loading: false,
  error: null
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.AUTH_STARTED:
      return { ...state, loading: true };
    case actionTypes.AUTH_FAILED:
      return { ...state, loading: false, error: payload.error };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: payload.token,
        userId: payload.userId,
        error: null
      };
    case actionTypes.AUTH_LOGOUT:
      return { ...state, token: null, userId: null };
    default:
      return state;
  }
};

export default reducer;
