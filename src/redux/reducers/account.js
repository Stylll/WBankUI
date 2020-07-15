import * as types from '../constants/actionTypes';
import { addToAccountList, calculateDeposit } from '../../helpers/utils';

const initialState = {
  accounts: [],
  isLoading: false,
  isCreateAccountLoading: false,
  accountCreateSuccess: false,
  isDepositAccoutLoading: false,
  accountDepositSuccess: false,
  errorMessage: '',
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ACCOUNTS:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case types.GET_ACCOUNTS_SUCCESS:
      return {
        ...state,
        accounts: action.accounts,
        isLoading: false,
        errorMessage: '',
      };
    case types.GET_ACCOUNTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message,
      };
    case types.CREATE_ACCOUNT:
      return {
        ...state,
        isCreateAccountLoading: true,
        errorMessage: '',
        accountCreateSuccess: false,
      };
    case types.CREATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: addToAccountList(state.accounts, action.accountData),
        isCreateAccountLoading: false,
        errorMessage: '',
        accountCreateSuccess: true,
      };
    case types.CREATE_ACCOUNT_FAILURE:
      return {
        ...state,
        isCreateAccountLoading: false,
        errorMessage: action.error.message,
        accountCreateSuccess: false,
      };
    case types.DEPOSIT_ACCOUNT:
      return {
        ...state,
        isDepositAccoutLoading: true,
        errorMessage: '',
        accountDepositSuccess: false,
      };
    case types.DEPOSIT_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: calculateDeposit(state.accounts, action.requestData),
        isDepositAccoutLoading: false,
        errorMessage: '',
        accountDepositSuccess: true,
      };
    case types.DEPOSIT_ACCOUNT_FAILURE:
      return {
        ...state,
        isDepositAccoutLoading: false,
        errorMessage: action.error.message,
        accountDepositSuccess: false,
      };
    default:
      return state;
  }
};

export default account;
