import {
  signinUser,
  signinUserSuccess,
  signinUserFailure,
  signupUser,
  signupUserFailure,
  signupUserSuccess,
  logoutUser,
} from '../../../redux/actionCreators/userActions';

import * as types from '../../../redux/constants/actionTypes';

describe('User actions test suite', () => {
  describe('Sign in User actions', () => {
    const userData = {
      customerId: '23',
      email: 'myemail@yahoo.com',
    };
    it('should return proper action type and payload for signinUser', () => {
      const expected = {
        type: types.SIGNIN_USER,
        userData,
      };
      const result = signinUser(userData);
      expect(expected).toEqual(result);
    });

    it('should return proper action type and payload for signinUserSuccess', () => {
      const expected = {
        type: types.SIGNIN_USER_SUCCESS,
        userData,
      };
      const result = signinUserSuccess(userData);
      expect(expected).toEqual(result);
    });

    it('should return proper action type and payload for signinUserFailure', () => {
      const error = 'error message';
      const expected = {
        type: types.SIGNIN_USER_FAILURE,
        error,
      };
      const result = signinUserFailure(error);
      expect(expected).toEqual(result);
    });
  });

  describe('Sign up User actions', () => {
    const userData = {
      customerId: '23',
      email: 'myemail@yahoo.com',
    };
    it('should return proper action type and payload for signupUser', () => {
      const expected = {
        type: types.SIGNUP_USER,
        userData,
      };
      const result = signupUser(userData);
      expect(expected).toEqual(result);
    });

    it('should return proper action type and payload for signupUserSuccess', () => {
      const expected = {
        type: types.SIGNUP_USER_SUCCESS,
        userData,
      };
      const result = signupUserSuccess(userData);
      expect(expected).toEqual(result);
    });

    it('should return proper action type and payload for signupUserFailure', () => {
      const error = 'error message';
      const expected = {
        type: types.SIGNUP_USER_FAILURE,
        error,
      };
      const result = signupUserFailure(error);
      expect(expected).toEqual(result);
    });
  });

  describe('Logout action', () => {
    it('should return logout action type', () => {
      const expected = {
        type: types.LOG_OUT,
      };
      const result = logoutUser();
      expect(expected).toEqual(result);
    });
  });
});
