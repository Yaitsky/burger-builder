import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
    purchasable: false,
    purchasing: false
  };

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients).reduce(
      (val, el) => val + ingredients[el],
      0
    );
    this.setState({ purchasable: sum > 0 });
  };

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

  showPurchasingModal = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseModal = () => {
    this.setState({ purchasing: false });
  };

  continuePurchase = () => {
    alert('You continue!');
  };

  render() {
    const { ingredients, totalPrice, purchasable, purchasing } = this.state;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <React.Fragment>
        <Modal modalClosed={this.cancelPurchaseModal} show={purchasing}>
          <OrderSummary
            price={totalPrice}
            purchaseCancelled={this.cancelPurchaseModal}
            purchaseContinued={this.continuePurchase}
            ingredients={ingredients}
          />
        </Modal>
        <Burger ingredients={ingredients} />
        <BuildControls
          ordered={this.showPurchasingModal}
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
