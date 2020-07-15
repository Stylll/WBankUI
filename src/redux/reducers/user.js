import * as types from '../constants/actionTypes';

const initialState = {
  user: {},
  isLoading: false,
  errorMessage: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case types.SIGNUP_USER:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case types.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        user: action.userData.userData.user,
        isLoading: false,
        errorMessage: '',
      };
    case types.SIGNUP_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message,
      };
    case types.SIGNIN_USER:
      return {
        ...state,
        isLoading: true,
        errorMessage: '',
      };
    case types.SIGNIN_USER_SUCCESS:
      return {
        ...state,
        user: action.userData.userData.user,
        isLoading: false,
        errorMessage: '',
      };
    case types.SIGNIN_USER_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
};

export default user;
