import React from 'react';

import classes from './Order.css';

const Order = props => {
  const { price, ingredients } = props;
  const ingredientsArray = Object.keys(ingredients).map(name => ({
    amount: ingredients[name],
    name
  }));
  const ingredientsOutput = ingredientsArray.map(ig => (
    <div
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        padding: '5px 10px',
        border: '1px solid #ccc'
      }}
      key={ig.name}
    >
      {ig.name} ({ig.amount})
    </div>
  ));

  return (
    <div className={classes.Order}>
      <div>
        Ingredients: {ingredientsOutput}
      </div>
      <p>
        Price: <strong>{price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
