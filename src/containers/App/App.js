import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from '../Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Logout from '../Auth/Logout/Logout';
import * as actions from '../../store/actions';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => import('../Checkout/Checkout'));
const asyncAuth = asyncComponent(() => import('../Auth/Auth'));
const asyncOrders = asyncComponent(() => import('../Orders/Orders'));

class App extends Component {
  componentDidMount() {
    this.props.autoAuth();
  }

  render() {
    const { isAuth } = this.props;
    const routes = isAuth ? (
      <Switch>
        <Route path='/checkout' component={asyncCheckout} />
        <Route path='/orders' component={asyncOrders} />
        <Route path='/logout' component={Logout} />
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    ) : (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

export default withRouter(connect(state => ({ isAuth: state.auth.token !== null }), { autoAuth: actions.authCheckState })(App));
