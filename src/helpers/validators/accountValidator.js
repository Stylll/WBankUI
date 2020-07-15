/* eslint-disable import/prefer-default-export */
import { isEmpty } from 'lodash';

const validateCreateAccount = (values) => {
  const errors = {};
  // name cannot be empty
  if (!values.name || (values.name && !values.name.trim())) {
    errors.name = 'name cannot be empty';
  }

  // opening balance is valid
  if (!values.openingBalance || (values.openingBalance && !values.openingBalance.trim())) {
    errors.openingBalance = 'opening balance cannot be empty';
  } else if (/[^0-9.]/gi.test(values.openingBalance.trim())) {
    errors.openingBalance = 'opening balance is invalid';
  } else if (parseFloat(values.openingBalance.trim()) <= 1) {
    errors.openingBalance = 'opening balance must be greater than 1';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export {
  validateCreateAccount,
};
