import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { CreateWithdrawal } from '../../components/CreateWithdrawal/CreateWithdrawal.component';

describe('CreateWithdrawal Test', () => {
  it('should render properly', () => {
    const { baseElement } = render(<CreateWithdrawal
      createWithdrawal={() => {}}
      closeModal={() => {}}
      isLoading={false}
      accountWithdrawalSuccess={false}
      errorMessage=""
    />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should validate the input', () => {
    const { baseElement, getByTestId, getByText } = render(<CreateWithdrawal
      createWithdrawal={() => {}}
      closeModal={() => {}}
      isLoading={false}
      accountWithdrawalSuccess={false}
      errorMessage=""
    />);
    fireEvent.click(getByTestId('createwithdrawal-withdraw'));
    expect(getByText('account number cannot be empty')).toBeInTheDocument();
    expect(getByText('amount cannot be empty')).toBeInTheDocument();
    expect(getByText('currency must be either cad, usd, or mxn')).toBeInTheDocument();
  });

  it('should submit form, call createWithdrawal and display error', () => {
    const createWithdrawal = jest.fn();
    const {
      baseElement, getByTestId, getByText, rerender,
    } = render(<CreateWithdrawal
      createWithdrawal={createWithdrawal}
      closeModal={() => {}}
      isLoading={false}
      accountWithdrawalSuccess={false}
      errorMessage=""
    />);

    fireEvent.change(getByTestId('createwithdrawal-accountNo'),
      { target: { value: '2345', name: 'accountNo' } });
    fireEvent.change(getByTestId('createwithdrawal-amount'),
      { target: { value: '245', name: 'amount' } });
    fireEvent.change(getByTestId('createwithdrawal-currency'),
      { target: { value: 'usd', name: 'currency' } });
    fireEvent.click(getByTestId('createwithdrawal-withdraw'));
    expect(createWithdrawal).toHaveBeenCalled();

    rerender(<CreateWithdrawal
      createWithdrawal={createWithdrawal}
      closeModal={() => {}}
      isLoading={false}
      accountWithdrawalSuccess={false}
      errorMessage="An error occurred"
    />);
    expect(getByText('An error occurred')).toBeInTheDocument();
  });
});
