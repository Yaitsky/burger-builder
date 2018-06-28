import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    const { token, onFetchOrders } = this.props;
    onFetchOrders(token);
  }

  render() {
    const { orders, loading, error } = this.props;
    const ordersBlock = loading ? (
      <Spinner />
    ) : (
      orders.map(item => <Order key={item.id} ingredients={item.ings} price={item.price} />)
    );
    return <div>{error ? <p>{error.message}</p> : ordersBlock}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading,
  error: state.order.error,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: token => dispatch(actions.fetchOrders(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
