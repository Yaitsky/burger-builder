import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerInit = () => ({
  type: actionTypes.PURCHASE_BURGER_INIT
});

export const purchaseBurgerSuccess = (id, data) => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload: { id, data }
});

export const purchaseBurgerStarted = () => ({
  type: actionTypes.PURCHASE_BURGER_STARTED
});

export const purchaseBurgerFailed = error => ({
  type: actionTypes.PURCHASE_BURGER_FAILED,
  error
});

export const purchaseBurgerStart = orderData => dispatch => {
  dispatch(purchaseBurgerStarted());
  axios
    .post('/orders.json', orderData)
    .then(({ data }) => dispatch(purchaseBurgerSuccess(data.name, orderData)))
    .catch(error => dispatch(purchaseBurgerFailed(error)));
};

export const fetchOrdersSuccess = orders => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload: { orders }
});

export const fetchOrdersFailed = () => ({
  type: actionTypes.FETCH_ORDERS_FAILED
});

export const fetchOrdersStarted = () => ({
  type: actionTypes.FETCH_ORDERS_STARTED
});

export const fetchOrders = () => dispatch => {
  dispatch(fetchOrdersStarted());
  axios
    .get('/orders.json')
    .then(({ data }) => dispatch(fetchOrdersSuccess(Object.keys(data).map(id => ({ ...data[id], id })))))
    .catch(() => dispatch(fetchOrdersFailed()));
};
