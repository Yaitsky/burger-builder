import React from 'react';

import classes from './Layout.css';

const Layout = props => (
  <React.Fragment>
    <div>Toolbar and other</div>
    <main className={classes.Content}>{props.children}</main>
  </React.Fragment>
);

export default Layout;
