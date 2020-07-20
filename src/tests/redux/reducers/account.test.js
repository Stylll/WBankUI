import accountReducer, { initialState } from '../../../redux/reducers/account';
import {
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_SUCCESS,
  GET_ACCOUNTS,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_FAILURE,
  DEPOSIT_ACCOUNT,
  DEPOSIT_ACCOUNT_SUCCESS,
  DEPOSIT_ACCOUNT_FAILURE,
  WITHDRAW_ACCOUNT,
  WITHDRAW_ACCOUNT_SUCCESS,
  WITHDRAW_ACCOUNT_FAILURE,
  TRANSFER_ACCOUNT,
  TRANSFER_ACCOUNT_SUCCESS,
  TRANSFER_ACCOUNT_FAILURE,
} from '../../../redux/constants/actionTypes';
import {
  newAccountData, errorData, accountA, accountB, getAccountsData,
  depositResponse, depositedAccountB, withdrawResponse, withdrawAccountA,
  transferResponse, transferAccountA, transferAccountB,
} from '../../testhelpers/accounts';

describe('Account Reducer Test Suite', () => {
  it('should return initial state', () => {
    const result = accountReducer(undefined, {});
    expect(initialState).toEqual(result);
  });

  describe('Create Account Reducer', () => {
    it('should return proper state for create account action', () => {
      const expected = { ...initialState };
      expected.isCreateAccountLoading = true;
      expected.errorMessage = '';
      expected.accountCreateSuccess = false;
      const result = accountReducer(initialState, { type: CREATE_ACCOUNT });
      expect(expected).toEqual(result);
    });

    it('should return proper state for create account success action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isCreateAccountLoading = true;
      state.accountCreateSuccess = false;
      expected.isCreateAccountLoading = false;
      expected.errorMessage = '';
      expected.accountCreateSuccess = true;
      expected.accounts = [accountA];
      const action = {
        type: CREATE_ACCOUNT_SUCCESS,
        accountData: newAccountData.account,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });

    it('should return proper state for create account failure action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isCreateAccountLoading = true;
      state.accountCreateSuccess = false;
      expected.isCreateAccountLoading = false;
      expected.errorMessage = errorData.message;
      expected.accountCreateSuccess = false;
      const action = {
        type: CREATE_ACCOUNT_FAILURE,
        error: errorData,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });
  });

  describe('Get Accounts Reducer', () => {
    it('should return proper state for get account action', () => {
      const expected = { ...initialState };
      expected.isLoading = true;
      expected.errorMessage = '';
      const result = accountReducer(initialState, { type: GET_ACCOUNTS });
      expect(expected).toEqual(result);
    });

    it('should return proper state for get accounts success action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isLoading = true;
      expected.isLoading = false;
      expected.errorMessage = '';
      expected.accounts = [accountA, accountB];
      const action = {
        type: GET_ACCOUNTS_SUCCESS,
        accounts: getAccountsData,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });

    it('should return proper state for get accounts failure action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isLoading = true;
      expected.isLoading = false;
      expected.errorMessage = errorData.message;
      const action = {
        type: GET_ACCOUNTS_FAILURE,
        error: errorData,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });
  });

  describe('Deposit Account Reducer', () => {
    it('should return proper state for deposit account action', () => {
      const expected = { ...initialState };
      expected.isDepositAccountLoading = true;
      expected.errorMessage = '';
      expected.accountDepositSuccess = false;
      const result = accountReducer(initialState, { type: DEPOSIT_ACCOUNT });
      expect(expected).toEqual(result);
    });

    it('should return proper state for deposit account success action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isDepositAccountLoading = true;
      state.accounts = [{ ...accountA }, { ...accountB }];
      expected.isDepositAccountLoading = false;
      expected.accountDepositSuccess = true;
      expected.errorMessage = '';
      expected.accounts = [accountA, depositedAccountB];
      const action = {
        type: DEPOSIT_ACCOUNT_SUCCESS,
        requestData: depositResponse,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });

    it('should return proper state for deposit account failure action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isDepositAccountLoading = true;
      expected.isDepositAccountLoading = false;
      expected.accountDepositSuccess = false;
      expected.errorMessage = errorData.message;
      const action = {
        type: DEPOSIT_ACCOUNT_FAILURE,
        error: errorData,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });
  });

  describe('Withdrawal Account Reducer', () => {
    it('should return proper state for withdraw account action', () => {
      const expected = { ...initialState };
      expected.isWithdrawAccountLoading = true;
      expected.errorMessage = '';
      expected.accountWithdrawalSuccess = false;
      const result = accountReducer(initialState, { type: WITHDRAW_ACCOUNT });
      expect(expected).toEqual(result);
    });

    it('should return proper state for withdraw account success action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isWithdrawAccountLoading = true;
      state.accountWithdrawalSuccess = false;
      state.accounts = [{ ...accountA }, { ...accountB }];
      expected.isWithdrawAccountLoading = false;
      expected.accountWithdrawalSuccess = true;
      expected.errorMessage = '';
      expected.accounts = [withdrawAccountA, accountB];
      const action = {
        type: WITHDRAW_ACCOUNT_SUCCESS,
        requestData: withdrawResponse,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });

    it('should return proper state for withdraw account failure action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isWithdrawAccountLoading = true;
      expected.isWithdrawAccountLoading = false;
      expected.accountWithdrawalSuccess = false;
      expected.errorMessage = errorData.message;
      const action = {
        type: WITHDRAW_ACCOUNT_FAILURE,
        error: errorData,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });
  });

  describe('Transfer Account Reducer', () => {
    it('should return proper state for transfer account action', () => {
      const expected = { ...initialState };
      expected.isTransferAccountLoading = true;
      expected.errorMessage = '';
      expected.accountTransferSuccess = false;
      const result = accountReducer(initialState, { type: TRANSFER_ACCOUNT });
      expect(expected).toEqual(result);
    });

    it('should return proper state for transfer account success action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isTransferAccountLoading = true;
      state.accountTransferSuccess = false;
      state.accounts = [{ ...accountA }, { ...accountB }];
      expected.isTransferAccountLoading = false;
      expected.accountTransferSuccess = true;
      expected.errorMessage = '';
      expected.accounts = [transferAccountA, transferAccountB];
      const action = {
        type: TRANSFER_ACCOUNT_SUCCESS,
        requestData: transferResponse,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });

    it('should return proper state for transfer account failure action', () => {
      const state = { ...initialState };
      const expected = { ...initialState };
      state.isTransferAccountLoading = true;
      expected.isTransferAccountLoading = false;
      expected.accountTransferSuccess = false;
      expected.errorMessage = errorData.message;
      const action = {
        type: TRANSFER_ACCOUNT_FAILURE,
        error: errorData,
      };
      const result = accountReducer(state, action);
      expect(expected).toEqual(result);
    });
  });
});
