import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as actions from "../../store/actions";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 5
        },
        valid: false,
        touched: false
      }
    },
    isFormValid: false,
    isSignUp: true
  };

  checkAllValidity = data => Object.keys(data).every(name => data[name].valid);

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) return true;
    if (rules.required) isValid = value.trim() !== "" && isValid;
    if (rules.minLength) isValid = value.length >= rules.minLength && isValid;
    if (rules.maxLength) isValid = value.length <= rules.maxLength && isValid;
    if (rules.isEmail)
      isValid = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) && isValid;

    return isValid;
  }

  onChangeHandler = (e, name) => {
    const { value } = e.target;

    this.setState(prevState => {
      const controls = {
        ...prevState.controls,
        [name]: {
          ...prevState.controls[name],
          value: value,
          touched: true,
          valid: this.checkValidity(value, prevState.controls[name].validation)
        }
      };
      const isFormValid = this.checkAllValidity(controls);
      return { controls, isFormValid };
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { controls, isSignUp } = this.state;
    this.props.onAuth(controls.email.value, controls.password.value, isSignUp);
  };

  switchAuthMethod = () => {
    this.setState(prevState => ({
      isSignUp: !prevState.isSignUp
    }));
  };

  render() {
    const { controls, isFormValid, isSignUp } = this.state;
    const { error, loading, isAuth, bulding } = this.props;
    const formElementsArray = Object.keys(controls).map(name => (
      <Input
        key={name}
        elementType={controls[name].elementType}
        elementConfig={controls[name].elementConfig}
        value={controls[name].value}
        invalid={!controls[name].valid}
        shouldValidate={controls[name].validation}
        touched={controls[name].touched}
        changed={e => this.onChangeHandler(e, name)}
      />
    ));
    const errorMessage = error ? (
      <p className={classes.Error}>{error.message}</p>
    ) : null;
    const url = bulding ? '/checkout' : '/';
    const form = loading ? (
      <Spinner />
    ) : (
      <React.Fragment>
        {isAuth && <Redirect to={url} />}
        {errorMessage}
        {formElementsArray}
        <Button disabled={!isFormValid} type="Success">
          SUBMIT
        </Button>
      </React.Fragment>
    );

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.onSubmitHandler}>{form}</form>
        <Button clicked={this.switchAuthMethod} type="Danger">
          SWITCH TO {isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    bulding: state.bb.building
  }),
  { onAuth: actions.auth }
)(Auth);
