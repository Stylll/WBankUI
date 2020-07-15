import * as types from '../constants/actionTypes';

export const getAccounts = () => ({
  type: types.GET_ACCOUNTS,
});

export const getAccountsSuccess = (accounts) => ({
  type: types.GET_ACCOUNTS_SUCCESS,
  accounts,
});

export const getAccountsFailure = (error) => ({
  type: types.GET_ACCOUNTS_FAILURE,
  error,
});

export const createAccount = (accountData) => ({
  type: types.CREATE_ACCOUNT,
  accountData,
});

export const createAccountSuccess = (accountData) => ({
  type: types.CREATE_ACCOUNT_SUCCESS,
  accountData,
});

export const createAccountFailure = (error) => ({
  type: types.CREATE_ACCOUNT_FAILURE,
  error,
});
