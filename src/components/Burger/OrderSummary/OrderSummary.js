import React, { Component } from 'react';

import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  

  render() {
    const { ingredients, purchaseCancelled, purchaseContinued, price } = this.props;
    const summary = Object.keys(ingredients).map(name => (
      <li key={name} style={{ textTransform: 'capitalize' }}>
        {name}: {ingredients[name]}
      </li>
    ));

    return (
      <React.Fragment>
        <h3>Your order</h3>
        <p>Your burger contains following ingredients:</p>
        <ul>{summary}</ul>
        <p>
          <strong>Total price: {price.toFixed(2)}</strong>
        </p>
        <p>Continue to checkout?</p>
        <Button clicked={purchaseCancelled} type="Danger">
          CANCEL
        </Button>
        <Button clicked={purchaseContinued} type="Success">
          CONTINUE
        </Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
