import { put, takeLatest, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { getUserDetails, apiErrorHandler } from '../../helpers/utils';
import UserAPI from '../../services/userApi';
import {
  signupUser,
  signupUserSuccess,
  signupUserFailure,
} from '../actionCreators/userActions';

export function* watchAuthenticateUserSagaAsync() {
  yield takeLatest(signupUser().type, signupUserSagaAsync);
}

export function* signupUserSagaAsync(action) {
  try {
    const response = yield call(UserAPI.signup, action.userData);
    const userData = yield getUserDetails(response.data.token);
    yield put(signupUserSuccess(userData));
    // eslint-disable-next-line no-undef
    window.location.replace('/dashboard');
    toastr.success('Signup', 'Your account has been successfully created');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(signupUserFailure({
      errors: error.response && error.response.data ? error.response.data.error : {},
      message: errorMessage,
    }));
    toastr.error('', 'An error occurred');
  }
}
