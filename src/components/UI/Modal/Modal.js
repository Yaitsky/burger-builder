import React, { Component } from "react";

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
  }
  
  render() {
    const { modalClosed, show, children } = this.props;
    return (
      <React.Fragment>
        <Backdrop clicked={modalClosed} show={show} />
        <div
          style={{
            transform: show ? "translateY(0)" : "translateY(-100vh)"
          }}
          className={classes.Modal}
        >
          {children}
        </div>
      </React.Fragment>
    );
  }
};

export default Modal;
