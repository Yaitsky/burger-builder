import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const CheckoutSummary = props => {
  const { ingredients } = props;

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div
        style={{
          width: "100%"
        }}
      >
        <Burger ingredients={ingredients} />
      </div>
      <div>
        <Button type="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button type="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
