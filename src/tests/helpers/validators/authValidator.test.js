import { validateSignin, validateSignup } from '../../../helpers/validators/authValidator';

describe('Auth Validator Test Suite', () => {
  describe('validateSignin Test', () => {
    it('should require id and email', () => {
      const values = {
        customerId: '',
        email: '',
      };
      const result = validateSignin(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.customerId).toEqual('customerId cannot be empty');
      expect(result.errors.email).toEqual('email cannot be empty');
    });

    it('should require a valid number', () => {
      const values = {
        customerId: 'customer',
        email: 'email@email.com',
      };
      const result = validateSignin(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.customerId).toEqual('customerId must be a number');
    });
  });

  describe('validateSignup Test', () => {
    it('should require fullname and email', () => {
      const values = {
        fullname: '',
        email: '',
      };
      const result = validateSignup(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.fullname).toEqual('fullname cannot be empty');
      expect(result.errors.email).toEqual('email cannot be empty');
    });

    it('should require a valid email', () => {
      const values = {
        fullname: 'customer',
        email: 'email',
      };
      const result = validateSignup(values);
      expect(result.isValid).toBe(false);
      expect(result.errors.email).toEqual('email is invalid');
    });
  });
});
