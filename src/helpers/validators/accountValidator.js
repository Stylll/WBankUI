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

  const result = {
    name: errors.name || '',
    openingBalance: errors.openingBalance || '',
  };

  return {
    isValid: isEmpty(errors),
    errors: result,
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

  const result = {
    accountNo: errors.accountNo || '',
    amount: errors.amount || '',
    currency: errors.currency || '',
  };

  return {
    isValid: isEmpty(errors),
    errors: result,
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

  const result = {
    accountNo: errors.accountNo || '',
    amount: errors.amount || '',
    currency: errors.currency || '',
  };

  return {
    isValid: isEmpty(errors),
    errors: result,
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

  const result = {
    accountNo: errors.accountNo || '',
    transferAccountNo: errors.transferAccountNo || '',
    amount: errors.amount || '',
    currency: errors.currency || '',
  };

  return {
    isValid: isEmpty(errors),
    errors: result,
  };
};

export {
  validateCreateAccount,
  validateCreateDeposit,
  validateCreateWithdrawal,
  validateCreateTransfer,
};
