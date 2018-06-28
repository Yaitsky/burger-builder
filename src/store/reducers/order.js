import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.PURCHASE_BURGER_INIT:
      return { ...state, purchased: false }
    case actionTypes.PURCHASE_BURGER_STARTED:
      return { ...state, loading: true };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: [...state.orders, { ...payload.data, id: payload.id }]
      };
    case actionTypes.PURCHASE_BURGER_FAILED:
      return { ...state, loading: false };
    case actionTypes.FETCH_ORDERS_STARTED:
      return { ...state, loading: true };
    case actionTypes.FETCH_ORDERS_FAILED:
      return { ...state, loading: false };
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return { ...state, loading: false, error: null, orders: payload.orders }
    default:
      return state;
  }
};

export default reducer;
