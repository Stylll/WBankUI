import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { CreateDeposit } from '../../components/CreateDeposit/CreateDeposit.component';

describe('CreateDeposit Test', () => {
  it('should render properly', () => {
    const { baseElement } = render(<CreateDeposit
      createDeposit={() => {}}
      closeModal={() => {}}
      isLoading={false}
      accountDepositSuccess={false}
      errorMessage=""
    />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should validate the input', () => {
    const { baseElement, getByTestId, getByText } = render(<CreateDeposit
      createDeposit={() => {}}
      closeModal={() => {}}
      isLoading={false}
      accountDepositSuccess={false}
      errorMessage=""
    />);
    fireEvent.click(getByTestId('createdeposit-deposit'));
    expect(getByText('account number cannot be empty')).toBeInTheDocument();
    expect(getByText('amount cannot be empty')).toBeInTheDocument();
    expect(getByText('currency must be either cad, usd, or mxn')).toBeInTheDocument();
  });

  it('should submit form, call createDeposit and display error', () => {
    const createDeposit = jest.fn();
    const {
      baseElement, getByTestId, getByText, rerender,
    } = render(<CreateDeposit
      createDeposit={createDeposit}
      closeModal={() => {}}
      isLoading={false}
      accountDepositSuccess={false}
      errorMessage=""
    />);

    fireEvent.change(getByTestId('createdeposit-accountNo'),
      { target: { value: '2345', name: 'accountNo' } });
    fireEvent.change(getByTestId('createdeposit-amount'),
      { target: { value: '245', name: 'amount' } });
    fireEvent.change(getByTestId('createdeposit-currency'),
      { target: { value: 'usd', name: 'currency' } });
    fireEvent.click(getByTestId('createdeposit-deposit'));
    expect(createDeposit).toHaveBeenCalled();

    rerender(<CreateDeposit
      createDeposit={createDeposit}
      closeModal={() => {}}
      isLoading={false}
      accountDepositSuccess={false}
      errorMessage="An error occurred"
    />);
    expect(getByText('An error occurred')).toBeInTheDocument();
  });
});
