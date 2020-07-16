/* eslint-disable import/prefer-default-export */
import jwt from 'jsonwebtoken';
import axios from 'axios';
import { jwtKey } from './defaults';

export const isExpired = (expiredTimeInSec) => {
  const now = new Date();
  const nowInSec = Math.floor(now.getTime() * 0.001); // Convert date to sec
  return nowInSec > expiredTimeInSec;
};

export const logout = () => {
  localStorage.removeItem(jwtKey);
};

export const getUserDetails = (tokn) => {
  try {
    const token = tokn || localStorage.getItem(jwtKey);
    const userData = jwt.decode(token);
    const isAuthenticated = !!(userData && !isExpired(userData.exp));

    if (tokn && isAuthenticated) {
      localStorage.setItem(jwtKey, tokn);
    }

    if (!isAuthenticated) {
      localStorage.removeItem(jwtKey);
    }

    const data = {
      isAuthenticated,
      userData,
    };

    return data;
  } catch (error) {
    localStorage.removeItem(jwtKey);
    return {
      isAuthenticated: false,
      userData: null,
    };
  }
};

export const apiErrorHandler = (error) => {
  let errorMessage;
  let validationErrors;
  // if server gets an error response, handle it
  if (error.response) {
    /**
       * using a switch statement instead of if/else because there is
       * a chance that we have to handle other error codes when we make
       * requests like GET to the server
       */
    switch (error.response.status) {
      case 500:
        errorMessage = 'Server error, try again';
        break;
      case 400:
        if (error.response.data.errors && error.response.data.errors.length) {
          validationErrors = error.response.data.errors
            .map((err) => err.msg || err.message)
            .join(', ');
          errorMessage = `${validationErrors}`;
        } else if (error.response.data.errors) {
          validationErrors = Object.keys(error.response.data.errors)
            .map((key) => error.response.data.errors[key] || error.response.data.errors[key].msg
              || error.response.data.errors[key].message)
            .join(', ');
          errorMessage = `${validationErrors}`;
        }
        else {
          errorMessage = error.response.data.message || error.response.statusText;
        }
        break;
      default:
        errorMessage = error.response.data.error || error.response.data.message;
    }
  } else {
    //  if server is down, client won't get a response
    errorMessage = 'Possible network error, please check your connection and try again';
  }
  return errorMessage;
};

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export const addToAccountList = (accounts, account) => {
  const newAccount = {
    accountName: account.name,
    accountNo: account.accountNo,
    openingBalance: account.openingBalance,
    currentBalance: account.openingBalance,
  };
  accounts.push(newAccount);

  return accounts;
};

export const calculateDeposit = (accounts, deposit) => {
  const newAccounts = [...accounts];
  const accountIndex = newAccounts
    .findIndex((account) => (account.accountNo === deposit.accountNo));
  if (accountIndex > -1) {
    const accountToUpdate = newAccounts[accountIndex];
    const balance = Number.parseFloat(accountToUpdate.currentBalance)
    + Number.parseFloat(deposit.cadAmount);
    accountToUpdate.currentBalance = balance;
    newAccounts[accountIndex] = accountToUpdate;
  }

  return newAccounts;
};

export const calculateWithdrawal = (accounts, withdrawal) => {
  const newAccounts = [...accounts];
  const accountIndex = newAccounts
    .findIndex((account) => (account.accountNo === withdrawal.accountNo));
  if (accountIndex > -1) {
    const accountToUpdate = newAccounts[accountIndex];
    const balance = Number.parseFloat(accountToUpdate.currentBalance)
    - Number.parseFloat(withdrawal.cadAmountDebited);
    accountToUpdate.currentBalance = balance;
    newAccounts[accountIndex] = accountToUpdate;
  }

  return newAccounts;
};

export const calculateTransfer = (accounts, transfer) => {
  const newAccounts = [...accounts];

  // debit account
  const accountIndex = newAccounts
    .findIndex((account) => (account.accountNo === transfer.accountNo));
  if (accountIndex > -1) {
    const accountToUpdate = newAccounts[accountIndex];
    const balance = Number.parseFloat(accountToUpdate.currentBalance)
    - Number.parseFloat(transfer.cadAmountTransferred);
    accountToUpdate.currentBalance = balance;
    newAccounts[accountIndex] = accountToUpdate;
  }

  // credit account
  const accountToCreditIndex = newAccounts
    .findIndex((account) => (account.accountNo === transfer.transfer.accountNo));
  if (accountToCreditIndex > -1) {
    const accountToCredit = newAccounts[accountToCreditIndex];
    const balance = Number.parseFloat(accountToCredit.currentBalance)
    + Number.parseFloat(transfer.cadAmountTransferred);
    accountToCredit.currentBalance = balance;
    newAccounts[accountToCreditIndex] = accountToCredit;
  }

  return newAccounts;
};
