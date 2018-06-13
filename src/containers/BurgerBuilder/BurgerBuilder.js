import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
  cheese: 0.4,
  meat: 1.3,
  salad: 0.2,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0
    },
    totalPrice: 0,
    purchasable: false
  };

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients).reduce((val, el) => val + ingredients[el], 0);
    this.setState({ purchasable: sum > 0 });
  }

  increaseIngredient = title => {
    const ingredients = {
      ...this.state.ingredients,
      [title]: this.state.ingredients[title] + 1
    };
    const totalPrice = this.state.totalPrice + INGREDIENT_PRICES[title];
    this.setState({ ingredients, totalPrice });
    this.updatePurchasableState(ingredients);
  };

  decreaseIngredient = title => {
    if (this.state.ingredients[title] <= 0) return;
    const ingredients = {
      ...this.state.ingredients,
      [title]: this.state.ingredients[title] - 1
    };
    const totalPrice = this.state.totalPrice - INGREDIENT_PRICES[title];
    this.setState({ ingredients, totalPrice });
    this.updatePurchasableState(ingredients);
  };

  render() {
    const { ingredients, totalPrice, purchasable } = this.state;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    };

    return (
      <React.Fragment>
        <Burger ingredients={ingredients} />
        <BuildControls
          purchasable={purchasable}
          price={totalPrice}
          disabled={disabledInfo}
          increase={this.increaseIngredient}
          decrease={this.decreaseIngredient}
        />
      </React.Fragment>
    );
  }
}

export default BurgerBuilder;
