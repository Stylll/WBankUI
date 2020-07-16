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

const validateCreateDeposit = (values) => {
  const errors = {};
  // accountNo is required,
  if (!values.accountNo || (values.accountNo && !values.accountNo.trim())) {
    errors.accountNo = 'account number cannot be empty';
  }

  // amount is required
  if (!values.amount || (values.amount && !values.amount.trim())) {
    errors.amount = 'amount cannot be empty';
  } else if (/[^0-9.]/gi.test(values.amount.trim())) {
    errors.amount = 'amount is invalid';
  } else if (parseFloat(values.amount.trim()) <= 1) {
    errors.amount = 'amount must be greater than 1';
  }

  // currency is required
  if (!['cad', 'usd', 'mxn'].includes(values.currency)) {
    errors.currency = 'currency must be either cad, usd, or mxn';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

const validateCreateWithdrawal = (values) => {
  const errors = {};
  // accountNo is required,
  if (!values.accountNo || (values.accountNo && !values.accountNo.trim())) {
    errors.accountNo = 'account number cannot be empty';
  }

  // amount is required
  if (!values.amount || (values.amount && !values.amount.trim())) {
    errors.amount = 'amount cannot be empty';
  } else if (/[^0-9.]/gi.test(values.amount.trim())) {
    errors.amount = 'amount is invalid';
  } else if (parseFloat(values.amount.trim()) <= 1) {
    errors.amount = 'amount must be greater than 1';
  }

  // currency is required
  if (!['cad', 'usd', 'mxn'].includes(values.currency)) {
    errors.currency = 'currency must be either cad, usd, or mxn';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

const validateCreateTransfer = (values) => {
  const errors = {};
  // accountNo is required,
  if (!values.accountNo || (values.accountNo && !values.accountNo.trim())) {
    errors.accountNo = 'account number cannot be empty';
  }

  // transferAccountNo is required
  if (!values.transferAccountNo || (values.transferAccountNo && !values.transferAccountNo.trim())) {
    errors.transferAccountNo = 'transfer account number cannot be empty';
  }

  // amount is required
  if (!values.amount || (values.amount && !values.amount.trim())) {
    errors.amount = 'amount cannot be empty';
  } else if (/[^0-9.]/gi.test(values.amount.trim())) {
    errors.amount = 'amount is invalid';
  } else if (parseFloat(values.amount.trim()) <= 1) {
    errors.amount = 'amount must be greater than 1';
  }

  // currency is required
  if (!['cad', 'usd', 'mxn'].includes(values.currency)) {
    errors.currency = 'currency must be either cad, usd, or mxn';
  }

  return {
    isValid: isEmpty(errors),
    errors,
  };
};

export {
  validateCreateAccount,
  validateCreateDeposit,
  validateCreateWithdrawal,
  validateCreateTransfer,
};
