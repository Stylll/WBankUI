import {
  createAccount,
  createAccountFailure,
  createAccountSuccess,
  getAccounts,
  getAccountsFailure,
  getAccountsSuccess,
  createDeposit,
  createDepositFailure,
  createDepositSuccess,
  createWithdrawal,
  createWithdrawalFailure,
  createWithdrawalSuccess,
  createTransfer,
  createTransferFailure,
  createTransferSuccess,

} from '../../../redux/actionCreators/accountActions';
import * as types from '../../../redux/constants/actionTypes';

describe('Account Actions Test suite', () => {
  describe('Create Account Actions', () => {
    const accountData = {
      name: 'My Account',
      openingBalance: 4556,
    };

    it('should return proper payload for createAccount', () => {
      const expected = {
        type: types.CREATE_ACCOUNT,
        accountData,
      };
      const result = createAccount(accountData);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for createAccountSuccess', () => {
      const expected = {
        type: types.CREATE_ACCOUNT_SUCCESS,
        accountData,
      };
      const result = createAccountSuccess(accountData);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for createAccountFailure', () => {
      const error = 'An error occurred';
      const expected = {
        type: types.CREATE_ACCOUNT_FAILURE,
        error,
      };
      const result = createAccountFailure(error);
      expect(expected).toEqual(result);
    });
  });

  describe('Get Accounts Actions', () => {
    const accounts = [
      {
        name: 'AccountA', openingBalance: 300, accountNo: '234', currentBalance: 300,
      },
      {
        name: 'AccountB', openingBalance: 500, accountNo: '432', currentBalance: 500,
      },
    ];

    it('should return proper payload for getAccounts', () => {
      const expected = {
        type: types.GET_ACCOUNTS,
      };
      const result = getAccounts();
      expect(expected).toEqual(result);
    });

    it('should return proper payload for getAccountsSuccess', () => {
      const expected = {
        type: types.GET_ACCOUNTS_SUCCESS,
        accounts,
      };
      const result = getAccountsSuccess(accounts);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for getAccountsFailure', () => {
      const error = 'An error occurred';
      const expected = {
        type: types.GET_ACCOUNTS_FAILURE,
        error,
      };
      const result = getAccountsFailure(error);
      expect(expected).toEqual(result);
    });
  });

  describe('Create Deposit Actions', () => {
    const requestData = {
      accountNo: '234',
      amount: '5000',
      currency: 'usd',
    };

    it('should return proper payload for createDeposit', () => {
      const expected = {
        type: types.DEPOSIT_ACCOUNT,
        requestData,
      };
      const result = createDeposit(requestData);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for createDepositSuccess', () => {
      const expected = {
        type: types.DEPOSIT_ACCOUNT_SUCCESS,
        requestData,
      };
      const result = createDepositSuccess(requestData);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for createDepositFailure', () => {
      const error = 'An error occurred';
      const expected = {
        type: types.DEPOSIT_ACCOUNT_FAILURE,
        error,
      };
      const result = createDepositFailure(error);
      expect(expected).toEqual(result);
    });
  });

  describe('Create Withdrawal Actions', () => {
    const requestData = {
      accountNo: '234',
      amount: '5000',
      currency: 'usd',
    };

    it('should return proper payload for createWithdrawal', () => {
      const expected = {
        type: types.WITHDRAW_ACCOUNT,
        requestData,
      };
      const result = createWithdrawal(requestData);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for createWithdrawalSuccess', () => {
      const expected = {
        type: types.WITHDRAW_ACCOUNT_SUCCESS,
        requestData,
      };
      const result = createWithdrawalSuccess(requestData);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for createWithdrawalFailure', () => {
      const error = 'An error occurred';
      const expected = {
        type: types.WITHDRAW_ACCOUNT_FAILURE,
        error,
      };
      const result = createWithdrawalFailure(error);
      expect(expected).toEqual(result);
    });
  });

  describe('Create Transfer Actions', () => {
    const requestData = {
      accountNo: '234',
      transferAccountNo: '456',
      amount: '5000',
      currency: 'usd',
    };

    it('should return proper payload for createTransfer', () => {
      const expected = {
        type: types.TRANSFER_ACCOUNT,
        requestData,
      };
      const result = createTransfer(requestData);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for createTransferSuccess', () => {
      const expected = {
        type: types.TRANSFER_ACCOUNT_SUCCESS,
        requestData,
      };
      const result = createTransferSuccess(requestData);
      expect(expected).toEqual(result);
    });

    it('should return proper payload for createTransferFailure', () => {
      const error = 'An error occurred';
      const expected = {
        type: types.TRANSFER_ACCOUNT_FAILURE,
        error,
      };
      const result = createTransferFailure(error);
      expect(expected).toEqual(result);
    });
  });
});
