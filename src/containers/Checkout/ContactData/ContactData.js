import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = () => {
    this.setState({ loading: true });
    const { ingredients, price } = this.props;
    const data = {
      customer: {
        name: 'Igor',
        address: {
          city: 'Moscow',
          street: 'Street 1'
        },
        email: 'yaickiu@gmail.com'
      },
      deliveryMethod: 'fastest',
      ingredients,
      price
    };

    axios
      .post('/orders.json', data)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
        console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
    console.log(this.props);
  };

  render() {
    const { loading } = this.state;
    let form = loading ? (
      <Spinner />
    ) : (
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          placeholder="Your Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postalCode"
          placeholder="Your Postal Code"
        />
        <Button type="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
