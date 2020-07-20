import userReducer, { initialState } from '../../../redux/reducers/user';
import {
  SIGNIN_USER,
  SIGNIN_USER_FAILURE,
  SIGNIN_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_FAILURE,
  SIGNUP_USER_SUCCESS,
} from '../../../redux/constants/actionTypes';
import { signupUserData, errorData, signinUserData } from '../../testhelpers/users';

describe('User Reducer Test Suite', () => {
  it('should return initial state', () => {
    const result = userReducer(undefined, {});
    expect(initialState).toEqual(result);
  });

  describe('Signup User Action Reducer', () => {
    it('should return proper state for signup user action', () => {
      const expected = { ...initialState };
      expected.isLoading = true;
      const result = userReducer(undefined, { type: SIGNUP_USER });
      expect(expected).toEqual(result);
    });

    it('should return proper state for signup success action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      const action = {
        type: SIGNUP_USER_SUCCESS,
        userData: signupUserData,
      };
      state.isLoading = true;
      state.errorMessage = '';
      expected.isLoading = false;
      expected.user = signupUserData.userData.user;
      expected.errorMessage = '';
      const result = userReducer(state, action);
      expect(expected).toEqual(result);
    });

    it('should return proper state for signup failure action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isLoading = true;
      state.errorMessage = '';
      expected.isLoading = false;
      expected.errorMessage = errorData.message;
      const action = {
        type: SIGNUP_USER_FAILURE,
        error: errorData,
      };
      const result = userReducer(state, action);
      expect(expected).toEqual(result);
    });
  });

  describe('Signin User Action Reducer', () => {
    it('should return proper state for signin user action', () => {
      const expected = { ...initialState };
      expected.isLoading = true;
      const result = userReducer(undefined, { type: SIGNIN_USER });
      expect(expected).toEqual(result);
    });

    it('should return proper state for signin success action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      const action = {
        type: SIGNIN_USER_SUCCESS,
        userData: signinUserData,
      };
      state.isLoading = true;
      state.errorMessage = '';
      expected.isLoading = false;
      expected.user = signinUserData.userData.user;
      expected.errorMessage = '';
      const result = userReducer(state, action);
      expect(expected).toEqual(result);
    });

    it('should return proper state for signin failure action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isLoading = true;
      state.errorMessage = '';
      expected.isLoading = false;
      expected.errorMessage = errorData.message;
      const action = {
        type: SIGNIN_USER_FAILURE,
        error: errorData,
      };
      const result = userReducer(state, action);
      expect(expected).toEqual(result);
    });
  });
});
