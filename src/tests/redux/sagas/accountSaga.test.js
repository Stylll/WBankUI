import { call } from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { toastr } from 'react-redux-toastr';

import {
  watchCreateAccountSagaAsync,
  watchGetAccountsSagaAsync,
  watchDepositAccountSagaAsync,
  watchWithdrawAccountSagaAsync,
  watchTransferAccountSagaAsync,
} from '../../../redux/sagas/accountSaga';
import api from '../../../services/accountApi';
import {
  createAccount,
  createAccountSuccess,
  createAccountFailure,
  getAccounts,
  getAccountsSuccess,
  getAccountsFailure,
  createDeposit,
  createDepositSuccess,
  createDepositFailure,
  createWithdrawal,
  createWithdrawalSuccess,
  createWithdrawalFailure,
  createTransfer,
  createTransferSuccess,
  createTransferFailure,
} from '../../../redux/actionCreators/accountActions';
import {
  createAccountApiResponse,
  getAccountsApiResponse,
  depositAccountRequest,
  depositAccountApiResponse,
  withdrawAccountRequest,
  withdrawAccountApiResponse,
  transferAccountRequest,
  transferAccountApiResponse,
  serverError,
  serverErrorB,
} from '../../testhelpers/accounts';

describe('Account Saga Test Suite', () => {
  describe('Create Account Test', () => {
    const newAccount = {
      name: 'My Account',
      openingBalance: 4556,
    };
    it('should dispatch the create account success action', () => {
      return expectSaga(watchCreateAccountSagaAsync)
        .provide([
          [call.fn(api.createAccount), createAccountApiResponse],
        ])
        .call(toastr.success, '', 'Account created successfully')
        .put(createAccountSuccess(createAccountApiResponse.data.data))
        .dispatch(createAccount(newAccount))
        .run();
    });

    it('should dispatch the create account failure action', () => {
      return expectSaga(watchCreateAccountSagaAsync)
        .provide([
          [call.fn(api.createAccount), throwError(serverError)],
        ])
        .call(toastr.error, '', 'Opening balance is required')
        .put(createAccountFailure({
          errors: {},
          message: 'Opening balance is required',
        }))
        .dispatch(createAccount(newAccount))
        .run();
    });
  });

  describe('Get Account Test', () => {
    it('should dispatch the get accounts success action', () => {
      return expectSaga(watchGetAccountsSagaAsync)
        .provide([
          [call.fn(api.getAccounts), getAccountsApiResponse],
        ])
        .call(toastr.success, '', 'Account records retrieved')
        .put(getAccountsSuccess(getAccountsApiResponse.data.data))
        .dispatch(getAccounts())
        .run();
    });

    it('should dispatch the get accounts failure action', () => {
      const error = new Error();
      return expectSaga(watchGetAccountsSagaAsync)
        .provide([
          [call.fn(api.getAccounts), throwError(error)],
        ])
        .call(toastr.error, '', 'Possible network error, please check your connection and try again')
        .put(getAccountsFailure({
          errors: {},
          message: 'Possible network error, please check your connection and try again',
        }))
        .dispatch(getAccounts())
        .run();
    });
  });

  describe('Deposit Account Test', () => {
    it('should dispatch the deposit account success action', () => {
      return expectSaga(watchDepositAccountSagaAsync)
        .provide([
          [call.fn(api.makeDeposit), depositAccountApiResponse],
        ])
        .call(toastr.success, '', 'Account deposit completed')
        .put(createDepositSuccess(depositAccountApiResponse.data.data))
        .dispatch(createDeposit(depositAccountRequest))
        .run();
    });

    it('should dispatch the deposit account failure action', () => {
      return expectSaga(watchDepositAccountSagaAsync)
        .provide([
          [call.fn(api.makeDeposit), throwError(serverErrorB)],
        ])
        .call(toastr.error, '', serverErrorB.response.data.errors.accountNo)
        .put(createDepositFailure({
          errors: {},
          message: serverErrorB.response.data.errors.accountNo,
        }))
        .dispatch(createDeposit(depositAccountRequest))
        .run();
    });
  });

  describe('Withdraw Account Test', () => {
    it('should dispatch the withdraw account success action', () => {
      return expectSaga(watchWithdrawAccountSagaAsync)
        .provide([
          [call.fn(api.makeWithdrawal), withdrawAccountApiResponse],
        ])
        .call(toastr.success, '', 'Account withdrawal completed')
        .put(createWithdrawalSuccess(withdrawAccountApiResponse.data.data))
        .dispatch(createWithdrawal(withdrawAccountRequest))
        .run();
    });

    it('should dispatch the withdraw account failure action', () => {
      return expectSaga(watchWithdrawAccountSagaAsync)
        .provide([
          [call.fn(api.makeWithdrawal), throwError(serverErrorB)],
        ])
        .call(toastr.error, '', serverErrorB.response.data.errors.accountNo)
        .put(createWithdrawalFailure({
          errors: {},
          message: serverErrorB.response.data.errors.accountNo,
        }))
        .dispatch(createWithdrawal(withdrawAccountRequest))
        .run();
    });
  });

  describe('Transfer Account Test', () => {
    it('should dispatch the transfer account success action', () => {
      return expectSaga(watchTransferAccountSagaAsync)
        .provide([
          [call.fn(api.makeTransfer), transferAccountApiResponse],
        ])
        .call(toastr.success, '', 'Account transfer completed')
        .put(createTransferSuccess(transferAccountApiResponse.data.data))
        .dispatch(createTransfer(transferAccountRequest))
        .run();
    });

    it('should dispatch the transfer account failure action', () => {
      return expectSaga(watchTransferAccountSagaAsync)
        .provide([
          [call.fn(api.makeTransfer), throwError(serverErrorB)],
        ])
        .call(toastr.error, '', serverErrorB.response.data.errors.accountNo)
        .put(createTransferFailure({
          errors: {},
          message: serverErrorB.response.data.errors.accountNo,
        }))
        .dispatch(createTransfer(transferAccountRequest))
        .run();
    });
  });
});
