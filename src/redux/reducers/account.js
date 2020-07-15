import * as types from '../constants/actionTypes';

const initialState = {
  accounts: [],
  isLoading: false,
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
    default:
      return state;
  }
};

export default account;
