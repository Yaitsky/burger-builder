import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = props => {
  const { ingredients } = props;
  let transformed = Object.keys(ingredients)
    .map(name =>
      [...Array(ingredients[name])].map((_, i) => (
        <BurgerIngredient key={name + i} type={name} />
      ))
    )
    .reduce((arr, el) => arr.concat(el), []);

  if (!transformed.length) {
    transformed = <p>Plase start adding ingredients!</p>
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={'bread-top'} />
      {transformed}
      <BurgerIngredient type={'bread-bottom'} />
    </div>
  );
};

export default Burger;
