import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 3,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        value: 'fastest',
        valid: true
      }
    },
    isFormValid: false,
    loading: false
  };

  orderHandler = e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { orderForm } = this.state;
    const { token, onPurchase } = this.props;
    const orderData = Object.keys(orderForm).reduce(
      (value, next) => ({ ...value, [next]: orderForm[next].value }),
      {}
    );
    const { ings, price } = this.props;
    const data = {
      ings,
      price,
      orderData
    };

    onPurchase(data, token);
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) return true;
    if (rules.required) isValid = value.trim() !== '' && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;

    return isValid;
  }

  checkAllValidity = data => Object.keys(data).every(name => data[name].valid);

  onChangeHandler = (e, name) => {
    const { value } = e.target;
    
    this.setState(prevState => {
      const orderForm = {
        ...prevState.orderForm,
        [name]: {
          ...prevState.orderForm[name],
          value: value,
          touched: true,
          valid: this.checkValidity(value, prevState.orderForm[name].validation)
        }
      };
      const isFormValid = this.checkAllValidity(orderForm);
      return { orderForm, isFormValid };
    });
  };

  render() {
    const { orderForm, isFormValid } = this.state;
    const { loading } = this.props;
    const formElementsArray = Object.keys(orderForm).map(name => (
      <Input
        key={name}
        elementType={orderForm[name].elementType}
        elementConfig={orderForm[name].elementConfig}
        value={orderForm[name].value}
        invalid={!orderForm[name].valid}
        shouldValidate={orderForm[name].validation}
        touched={orderForm[name].touched}
        changed={e => this.onChangeHandler(e, name)}
      />
    ));
    let form = loading ? (
      <Spinner />
    ) : (
      <form onSubmit={this.orderHandler}>
        {formElementsArray}
        <Button disabled={!isFormValid} type="Success" clicked={this.orderHandler}>
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

const mapStateToProps = state => ({ 
  ings: state.bb.ingredients,
  price: state.bb.totalPrice,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
  onPurchase: (data, token) => dispatch(actions.purchaseBurgerStart(data, token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
