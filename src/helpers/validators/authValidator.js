/* eslint-disable import/prefer-default-export */
import { isEmpty } from 'lodash';
import isEmail from 'validator/lib/isEmail';

const validateSignup = (values) => {
  const errors = {};
  // fullname cannot be empty
  if (!values.fullname || (values.fullname && !values.fullname.trim())) {
    errors.fullname = 'fullname cannot be empty';
  }

  // email cannot be empty
  if (!values.email || (values.email && !values.email.trim())) {
    errors.email = 'email cannot be empty';
  }

  // email is valid
  if (!errors.email && !isEmail(values.email)) {
    errors.email = 'email is invalid';
  }

  const result = {
    fullname: errors.fullname || '',
    email: errors.email || '',
  };

  return {
    isValid: isEmpty(errors),
    errors: result,
  };
};

const validateSignin = (values) => {
  const errors = {};
  // customerId cannot be empty
  if (!values.customerId || (values.customerId && !values.customerId.trim())) {
    errors.customerId = 'customerId cannot be empty';
  } else if (/[^0-9.]/gi.test(values.customerId.trim())) {
    errors.customerId = 'customerId must be a number';
  }

  // email cannot be empty
  if (!values.email || (values.email && !values.email.trim())) {
    errors.email = 'email cannot be empty';
  }

  const result = {
    customerId: errors.customerId || '',
    email: errors.email || '',
  };

  return {
    isValid: isEmpty(errors),
    errors: result,
  };
};

export {
  validateSignup,
  validateSignin,
};
