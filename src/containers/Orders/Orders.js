import React, { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actions from '../../store/actions/index';

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    const { orders, loading } = this.props;
    const ordersBlock = loading ? (
      <Spinner />
    ) : (
      orders.map(item => <Order key={item.id} ingredients={item.ings} price={item.price} />)
    );
    return <div>{ordersBlock}</div>;
  }
}

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
