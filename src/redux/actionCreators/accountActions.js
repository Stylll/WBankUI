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

export const createDeposit = (requestData) => ({
  type: types.DEPOSIT_ACCOUNT,
  requestData,
});

export const createDepositSuccess = (requestData) => ({
  type: types.DEPOSIT_ACCOUNT_SUCCESS,
  requestData,
});

export const createDepositFailure = (error) => ({
  type: types.DEPOSIT_ACCOUNT_FAILURE,
  error,
});

export const createWithdrawal = (requestData) => ({
  type: types.WITHDRAW_ACCOUNT,
  requestData,
});

export const createWithdrawalSuccess = (requestData) => ({
  type: types.WITHDRAW_ACCOUNT_SUCCESS,
  requestData,
});

export const createWithdrawalFailure = (error) => ({
  type: types.WITHDRAW_ACCOUNT_FAILURE,
  error,
});
