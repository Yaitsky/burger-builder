import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Orders extends Component {
  state = {
    orders: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true })
    axios
      .get('/orders.json')
      .then(({ data }) => {
        const orders = data ? Object.keys(data).map(id => ({ id, ...data[id] })) : [];
        this.setState({ orders, loading: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    const { orders, loading } = this.state;
    const ordersBlock = loading ? (
      <Spinner />
    ) : (
      orders.map(item => <Order key={item.id} ingredients={item.ingredients} price={item.price} />)
    );
    return <div>{ordersBlock}</div>;
  }
}

export default withErrorHandler(Orders, axios);
