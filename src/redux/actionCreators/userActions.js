import * as types from '../constants/actionTypes';

export const signupUser = (userData) => ({
  type: types.SIGNUP_USER,
  userData,
});

export const signupUserSuccess = (userData) => ({
  type: types.SIGNUP_USER_SUCCESS,
  userData,
});

export const signupUserFailure = (error) => ({
  type: types.SIGNUP_USER_FAILURE,
  error,
});

export const signinUser = (userData) => ({
  type: types.SIGNIN_USER,
  userData,
});

export const signinUserSuccess = (userData) => ({
  type: types.SIGNIN_USER_SUCCESS,
  userData,
});

export const signinUserFailure = (error) => ({
  type: types.SIGNIN_USER_FAILURE,
  error,
});

export const logoutUser = () => ({
  type: types.LOG_OUT,
});
