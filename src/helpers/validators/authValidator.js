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

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export {
  validateSignup,
};
