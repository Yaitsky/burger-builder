import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  cheese: 0.4,
  meat: 1.3,
  salad: 0.2,
  bacon: 0.7
};

const initialState = {
  ingredients: null,
  error: false,
  totalPrice: 0,
  building: false
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        error: false,
        ingredients: payload.data,
        totalPrice: 0,
        building: false
      };
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.name]: state.ingredients[payload.name] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.name],
        building: true
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.name]: state.ingredients[payload.name] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.name],
        building: true
      };
    default:
      return state;
  }
};

export default reducer;
