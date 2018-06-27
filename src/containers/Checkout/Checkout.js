import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    const { ings, match, purchased } = this.props;
    let summary = <Redirect to="/" />;
    const purchasedRedirect = purchased ? <Redirect to="/" /> : null;

    if (ings) {
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
            ingredients={ings}
          />
          <Route path={`${match.url}/contact-data`} component={ContactData} />
        </div>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => ({
  ings: state.bb.ingredients,
  purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);
