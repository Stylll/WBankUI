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
