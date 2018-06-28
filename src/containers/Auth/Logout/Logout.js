import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return (
      <div>
        <Redirect to="/" />
      </div>
    );
  }
}

export default connect(
  null,
  { onLogout: actions.authLogout }
)(Logout);
