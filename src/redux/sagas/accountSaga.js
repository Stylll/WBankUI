import { put, takeLatest, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { apiErrorHandler } from '../../helpers/utils';
import AccountApi from '../../services/accountApi';
import {
  getAccounts,
  getAccountsSuccess,
  getAccountsFailure,
} from '../actionCreators/accountActions';

export function* watchGetAccountsSagaAsync() {
  yield takeLatest(getAccounts().type, getAccountsSagaAsync);
}

export function* getAccountsSagaAsync(action) {
  try {
    const response = yield call(AccountApi.getAccounts);
    yield put(getAccountsSuccess(response.data.data));
    // eslint-disable-next-line no-undef
    toastr.success('', 'Account records retrieved');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getAccountsFailure({
      errors: error.response && error.response.data ? error.response.data.error : {},
      message: errorMessage,
    }));
    toastr.error('', errorMessage || 'An error occurred');
  }
}
