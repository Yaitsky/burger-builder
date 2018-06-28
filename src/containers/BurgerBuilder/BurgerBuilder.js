import React, { Component } from "react";
import { connect } from "react-redux";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as actions from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.initIngredients();
  }

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients).reduce(
      (val, el) => val + ingredients[el],
      0
    );
    return sum > 0;
  };

  showPurchasingModal = () => {
    const { isAuth, history } = this.props;
    if (isAuth) this.setState({ purchasing: true });
    else history.push('/auth');
  };

  cancelPurchaseModal = () => {
    this.setState({ purchasing: false });
  };

  continuePurchase = () => {
    this.props.onPurchaseInit();
    this.props.history.push("/checkout");
  };

  render() {
    const { purchasing } = this.state;
    const {
      ings,
      price,
      onIgredientAdded,
      onIgredientDeleted,
      error,
      isAuth
    } = this.props;
    const disabledInfo = { ...ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (ings) {
      burger = (
        <React.Fragment>
          <Burger ingredients={ings} />
          <BuildControls
            ordered={this.showPurchasingModal}
            purchasable={this.updatePurchasableState(ings)}
            price={price}
            disabled={disabledInfo}
            increase={onIgredientAdded}
            decrease={onIgredientDeleted}
            isAuth={isAuth}
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          price={price}
          purchaseCancelled={this.cancelPurchaseModal}
          purchaseContinued={this.continuePurchase}
          ingredients={ings}
        />
      );
    }

    // if (loading) {
    //   orderSummary = <Spinner />;
    // }

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

const mapStateToProps = state => ({
  ings: state.bb.ingredients,
  price: state.bb.totalPrice,
  error: state.bb.error,
  isAuth: state.auth.token !== null
});

const mapDispatchToProps = dispatch => ({
  onIgredientAdded: name => dispatch(actions.addIngredient(name)),
  onIgredientDeleted: name => dispatch(actions.removeIngredient(name)),
  initIngredients: () => dispatch(actions.initIngredients()),
  onPurchaseInit: () => dispatch(actions.purchaseBurgerInit())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
