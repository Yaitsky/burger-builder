import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
      {controls.map(item => (
        <BuildControl
          disabled={props.disabled[item.type]}
          increase={() => props.increase(item.type)}
          decrease={() => props.decrease(item.type)}
          key={item.label}
          label={item.label}
        />
      ))}
      <button disabled={!props.purchasable} className={classes.OrderButton}>ORDER NOW</button>
    </div>
  );
};

export default BuildControls;
