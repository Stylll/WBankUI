import { put, takeLatest, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { getUserDetails, apiErrorHandler } from '../../helpers/utils';
import UserAPI from '../../services/userApi';
import {
  signupUser,
  signupUserSuccess,
  signupUserFailure,
  signinUser,
  signinUserSuccess,
  signinUserFailure,
} from '../actionCreators/userActions';

export function* watchSignupUserSagaAsync() {
  yield takeLatest(signupUser().type, signupUserSagaAsync);
}

export function* watchSigninUserSagaAsync() {
  yield takeLatest(signinUser().type, signinUserSagaAsync);
}

export function* signupUserSagaAsync(action) {
  try {
    const response = yield call(UserAPI.signup, action.userData);
    const userData = yield call(getUserDetails, response.data.token);
    yield put(signupUserSuccess(userData));
    // eslint-disable-next-line no-undef
    window.location.replace('/dashboard');
    yield call(toastr.success, 'Signup', 'Your account has been successfully created');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(signupUserFailure({
      errors: error.response && error.response.data
      && error.response.data.error ? error.response.data.error : {},
      message: errorMessage,
    }));
    yield call(toastr.error, '', 'An error occurred');
  }
}

export function* signinUserSagaAsync(action) {
  try {
    const response = yield call(UserAPI.signin, action.userData);
    const userData = yield call(getUserDetails, response.data.token);
    yield put(signinUserSuccess(userData));
    // eslint-disable-next-line no-undef
    window.location.replace('/dashboard');
    yield call(toastr.success, 'Signin', 'Your account has been successfully authenticated');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(signinUserFailure({
      errors: error.response && error.response.data
      && error.response.data.error ? error.response.data.error : {},
      message: errorMessage,
    }));
    yield call(toastr.error, '', 'An error occurred');
  }
}
