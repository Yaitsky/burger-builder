import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem active={true} link="/">Burger Builder</NavigationItem>
    <NavigationItem active={false} link="/">Checkout</NavigationItem>
  </ul>
);

export default NavigationItems;