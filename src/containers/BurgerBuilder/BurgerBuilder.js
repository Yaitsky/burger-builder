import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // axios
    //   .get("/ingredients.json")
    //   .then(({ data }) => this.setState({ ingredients: data }))
    //   .catch(() => this.setState({ error: true }));
  }

  updatePurchasableState = ingredients => {
    const sum = Object.keys(ingredients).reduce(
      (val, el) => val + ingredients[el],
      0
    );
    return sum > 0;
  };

  showPurchasingModal = () => {
    this.setState({ purchasing: true });
  };

  cancelPurchaseModal = () => {
    this.setState({ purchasing: false });
  };

  continuePurchase = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const { purchasing, loading, error } = this.state;
    const { ings, price, onIgredientAdded, onIgredientDeleted } = this.props;
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

const mapStateToProps = state => ({
  ings: state.ingredients,
  price: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
  onIgredientAdded: name =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { name } }),
  onIgredientDeleted: name =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { name } })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
