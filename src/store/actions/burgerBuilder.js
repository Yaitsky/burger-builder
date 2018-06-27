import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = name => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { name }
});

export const removeIngredient = name => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: { name }
});

export const setIngredients = data => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: { data }
});

export const setErrorState = () => ({
  type: actionTypes.FETCH_INGREDIENTS_FAILED
});

export const initIngredients = () => dispatch => {
  axios
    .get("/ingredients.json")
    .then(({ data }) => dispatch(setIngredients(data)))
    .catch(error => dispatch(setErrorState()));
};
