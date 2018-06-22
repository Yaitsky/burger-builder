import React from 'react';

import classes from './Input.css';

const Input = props => {
  const {
    label,
    elementType,
    elementConfig,
    value,
    changed,
    invalid,
    touched
  } = props;
  const inputClasses = [classes.InputElement];
  let inputElement = null;

  if (invalid && props.shouldValidate && touched)
    inputClasses.push(classes.Invalid);

  switch (elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={value}
          onChange={changed}
        >
          {elementConfig.options.map(field => (
            <option key={field.value} value={field.value}>
              {field.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
