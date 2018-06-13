import React from 'react';

import classes from './BuildControl.css';

const BuildControl = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <button disabled={props.disabled} onClick={props.decrease} className={classes.Less}>
        Less
      </button>
      <button onClick={props.increase} className={classes.More}>
        More
      </button>
    </div>
  );
};

export default BuildControl;
