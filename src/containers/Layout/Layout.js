import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  openDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  render() {
    const { showSideDrawer } = this.state;
    const { isAuth } = this.props;
    return (
      <React.Fragment>
        <Toolbar isAuth={isAuth} openDrawer={this.openDrawerHandler} />
        <SideDrawer
          isAuth={isAuth}
          show={showSideDrawer}
          closed={this.sideDrawerToggleHandler}
        />
        <div className={classes.Layout}>
          <main className={classes.Content}>{this.props.children}</main>
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

export default connect(state => ({ isAuth: state.auth.token !== null }))(Layout);
