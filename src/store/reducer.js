import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  cheese: 0.4,
  meat: 1.3,
  salad: 0.2,
  bacon: 0.7
};

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 0
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.name]: state.ingredients[payload.name] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[payload.name]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [payload.name]: state.ingredients[payload.name] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[payload.name]
      };
    default:
      return state;
  }
};

export default reducer;
