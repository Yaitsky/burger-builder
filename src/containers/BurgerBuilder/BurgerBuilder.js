import React, { Component } from "react";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  cheese: 0.4,
  meat: 1.3,
  salad: 0.2,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 0,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(({ data }) => this.setState({ ingredients: data }))
      .catch(() => this.setState({ error: true }));
  }

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
    this.setState({ loading: true });
    const { ingredients, totalPrice } = this.state;
    const data = {
      customer: {
        name: "Igor",
        address: {
          city: "Moscow",
          street: "Street 1"
        },
        email: "yaickiu@gmail.com"
      },
      price: totalPrice,
      deliveryMethod: "fastest",
      ingredients
    };

    axios
      .post("/orders.json", data)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
  };

  render() {
    const {
      ingredients,
      totalPrice,
      purchasable,
      purchasing,
      loading,
      error
    } = this.state;
    const disabledInfo = { ...ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ingredients) {
      burger = (
        <React.Fragment>
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
      orderSummary = (
        <OrderSummary
          price={totalPrice}
          purchaseCancelled={this.cancelPurchaseModal}
          purchaseContinued={this.continuePurchase}
          ingredients={ingredients}
        />
      );
    }

    if (loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal modalClosed={this.cancelPurchaseModal} show={purchasing}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
