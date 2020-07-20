import { put, takeLatest, call } from 'redux-saga/effects';
import { toastr } from 'react-redux-toastr';
import { apiErrorHandler } from '../../helpers/utils';
import AccountApi from '../../services/accountApi';
import {
  getAccounts,
  getAccountsSuccess,
  getAccountsFailure,
  createAccount,
  createAccountSuccess,
  createAccountFailure,
  createDeposit,
  createDepositSuccess,
  createDepositFailure,
  createWithdrawal,
  createWithdrawalSuccess,
  createWithdrawalFailure,
  createTransfer,
  createTransferSuccess,
  createTransferFailure,
} from '../actionCreators/accountActions';

export function* watchGetAccountsSagaAsync() {
  yield takeLatest(getAccounts().type, getAccountsSagaAsync);
}

export function* watchCreateAccountSagaAsync() {
  yield takeLatest(createAccount().type, createAccountSagaAsync);
}

export function* watchDepositAccountSagaAsync() {
  yield takeLatest(createDeposit().type, depositAccountSagaAsync);
}

export function* watchWithdrawAccountSagaAsync() {
  yield takeLatest(createWithdrawal().type, withdrawAccountSagaAsync);
}

export function* watchTransferAccountSagaAsync() {
  yield takeLatest(createTransfer().type, transferAccountSagaAsync);
}

export function* getAccountsSagaAsync(action) {
  try {
    const response = yield call(AccountApi.getAccounts);
    yield put(getAccountsSuccess(response.data.data));
    // eslint-disable-next-line no-undef
    yield call(toastr.success, '', 'Account records retrieved');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(getAccountsFailure({
      errors: error.response && error.response.data ? error.response.data.error : {},
      message: errorMessage,
    }));
    yield call(toastr.error, '', errorMessage || 'An error occurred');
  }
}

export function* createAccountSagaAsync(action) {
  try {
    const response = yield call(AccountApi.createAccount, action.accountData);
    yield put(createAccountSuccess(response.data.data));
    // eslint-disable-next-line no-undef
    yield call(toastr.success, '', 'Account created successfully');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createAccountFailure({
      errors: error.response && error.response.data
      && error.response.data.error ? error.response.data.error : {},
      message: errorMessage,
    }));
    yield call(toastr.error, '', errorMessage || 'An error occurred');
  }
}

export function* depositAccountSagaAsync(action) {
  try {
    const response = yield call(AccountApi.makeDeposit, action.requestData);
    yield put(createDepositSuccess(response.data.data));
    // eslint-disable-next-line no-undef
    yield call(toastr.success, '', 'Account deposit completed');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createDepositFailure({
      errors: error.response && error.response.data
      && error.response.data.error ? error.response.data.error : {},
      message: errorMessage,
    }));
    yield call(toastr.error, '', errorMessage || 'An error occurred');
  }
}

export function* withdrawAccountSagaAsync(action) {
  try {
    const response = yield call(AccountApi.makeWithdrawal, action.requestData);
    yield put(createWithdrawalSuccess(response.data.data));
    // eslint-disable-next-line no-undef
    yield call(toastr.success, '', 'Account withdrawal completed');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createWithdrawalFailure({
      errors: error.response && error.response.data
      && error.response.data.error ? error.response.data.error : {},
      message: errorMessage,
    }));
    yield call(toastr.error, '', errorMessage || 'An error occurred');
  }
}
export function* transferAccountSagaAsync(action) {
  try {
    const response = yield call(AccountApi.makeTransfer, action.requestData);
    yield put(createTransferSuccess(response.data.data));
    // eslint-disable-next-line no-undef
    yield call(toastr.success, '', 'Account transfer completed');
  } catch (error) {
    const errorMessage = apiErrorHandler(error);
    yield put(createTransferFailure({
      errors: error.response && error.response.data
      && error.response.data.error ? error.response.data.error : {},
      message: errorMessage,
    }));
    yield call(toastr.error, '', errorMessage || 'An error occurred');
  }
}
