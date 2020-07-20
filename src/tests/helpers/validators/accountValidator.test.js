import {
  validateCreateAccount,
  validateCreateDeposit,
  validateCreateWithdrawal,
  validateCreateTransfer,
} from '../../../helpers/validators/accountValidator';

describe('Account Validator Test Suite', () => {
  describe('validateCreateAccount Test', () => {
    it('it should require name and opening balance', () => {
      const values = {
        name: '',
        openingBalance: '',
      };

      const result = validateCreateAccount(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toEqual('name cannot be empty');
      expect(result.errors.openingBalance).toEqual('opening balance cannot be empty');
    });

    it('it should require valid opening balance', () => {
      const values = {
        name: 'Account A',
        openingBalance: 'balance',
      };

      const result = validateCreateAccount(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.openingBalance).toEqual('opening balance is invalid');
    });

    it('it should require an opening balance above 1', () => {
      const values = {
        name: 'Account A',
        openingBalance: '0',
      };

      const result = validateCreateAccount(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.openingBalance).toEqual('opening balance must be greater than 1');
    });
  });

  describe('validateDepositAccount Test', () => {
    it('it should require accountNo, amount and currency', () => {
      const values = {
        accountNo: '',
        amount: '',
        currency: '',
      };

      const result = validateCreateDeposit(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.accountNo).toEqual('account number cannot be empty');
      expect(result.errors.amount).toEqual('amount cannot be empty');
      expect(result.errors.currency).toEqual('currency must be either cad, usd, or mxn');
    });

    it('it should require valid amount', () => {
      const values = {
        accountNo: '45349',
        amount: 'amount',
        currency: 'cad',
      };

      const result = validateCreateDeposit(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toEqual('amount is invalid');
    });

    it('it should require an amount above 1', () => {
      const values = {
        accountNo: '45349',
        amount: '0',
        currency: 'cad',
      };

      const result = validateCreateDeposit(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toEqual('amount must be greater than 1');
    });
  });

  describe('validateWithdrawAccount Test', () => {
    it('it should require accountNo, amount and currency', () => {
      const values = {
        accountNo: '',
        amount: '',
        currency: '',
      };

      const result = validateCreateWithdrawal(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.accountNo).toEqual('account number cannot be empty');
      expect(result.errors.amount).toEqual('amount cannot be empty');
      expect(result.errors.currency).toEqual('currency must be either cad, usd, or mxn');
    });

    it('it should require valid amount', () => {
      const values = {
        accountNo: '45349',
        amount: 'amount',
        currency: 'cad',
      };

      const result = validateCreateWithdrawal(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toEqual('amount is invalid');
    });

    it('it should require an amount above 1', () => {
      const values = {
        accountNo: '45349',
        amount: '0',
        currency: 'cad',
      };

      const result = validateCreateWithdrawal(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toEqual('amount must be greater than 1');
    });
  });

  describe('validateTransferAccount Test', () => {
    it('it should require accountNo, transferAccountNo, amount and currency', () => {
      const values = {
        accountNo: '',
        transferAccountNo: '',
        amount: '',
        currency: '',
      };

      const result = validateCreateTransfer(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.accountNo).toEqual('account number cannot be empty');
      expect(result.errors.transferAccountNo).toEqual('transfer account number cannot be empty');
      expect(result.errors.amount).toEqual('amount cannot be empty');
      expect(result.errors.currency).toEqual('currency must be either cad, usd, or mxn');
    });

    it('it should require valid amount', () => {
      const values = {
        accountNo: '45349',
        transferAccountNo: '1265',
        amount: 'amount',
        currency: 'cad',
      };

      const result = validateCreateTransfer(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toEqual('amount is invalid');
    });

    it('it should require an amount above 1', () => {
      const values = {
        accountNo: '45349',
        transferAccountNo: '1265',
        amount: '0',
        currency: 'cad',
      };

      const result = validateCreateTransfer(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toEqual('amount must be greater than 1');
    });
  });
});
