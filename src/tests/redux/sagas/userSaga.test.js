import { call } from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { toastr } from 'react-redux-toastr';
import {
  watchSignupUserSagaAsync,
  watchSigninUserSagaAsync,
} from '../../../redux/sagas/userSaga';
import { getUserDetails } from '../../../helpers/utils';
import api from '../../../services/userApi';
import {
  signupUser,
  signupUserSuccess,
  signupUserFailure,
  signinUser,
  signinUserSuccess,
  signinUserFailure,
} from '../../../redux/actionCreators/userActions';
import {
  serverError, signupApiResponse, user, signinApiResponse,
} from '../../testhelpers/users';

describe('User Saga Test Suite', () => {
  describe('Signup User Test', () => {
    it('should dispatch signup user action', () => {
      return expectSaga(watchSignupUserSagaAsync)
        .provide([
          [call.fn(api.signup), signupApiResponse],
          [call.fn(getUserDetails), user],
          [call.fn(toastr.success), null],
        ])
        .put(signupUserSuccess(user))
        .dispatch(signupUser(user))
        .run();
    });

    it('should dispatch signup error action', () => {
      return expectSaga(watchSignupUserSagaAsync)
        .provide([
          [call.fn(api.signup), throwError(serverError)],
        ])
        .put(signupUserFailure({
          errors: {},
          message: 'Email is required',
        }))
        .dispatch(signupUser(user))
        .run();
    });
  });
  describe('Signin User Test', () => {
    it('should dispatch signin user action', () => {
      return expectSaga(watchSigninUserSagaAsync)
        .provide([
          [call.fn(api.signin), signinApiResponse],
          [call.fn(getUserDetails), user],
          [call.fn(toastr.success), null],
        ])
        .put(signinUserSuccess(user))
        .dispatch(signinUser(user))
        .run();
    });

    it('should dispatch signin error action', () => {
      return expectSaga(watchSigninUserSagaAsync)
        .provide([
          [call.fn(api.signin), throwError(serverError)],
        ])
        .put(signinUserFailure({
          errors: {},
          message: 'Email is required',
        }))
        .dispatch(signinUser(user))
        .run();
    });
  });
});
