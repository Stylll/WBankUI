import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { CreateTransfer } from '../../components/CreateTransfer/CreateTransfer.component';

describe('CreateTransfer Test', () => {
  it('should render properly', () => {
    const { baseElement } = render(<CreateTransfer
      createTransfer={() => {}}
      closeModal={() => {}}
      isLoading={false}
      accountTransferSuccess={false}
      errorMessage=""
    />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should validate the input', () => {
    const { baseElement, getByTestId, getByText } = render(<CreateTransfer
      createTransfer={() => {}}
      closeModal={() => {}}
      isLoading={false}
      accountTransferSuccess={false}
      errorMessage=""
    />);
    fireEvent.click(getByTestId('createtransfer-transfer'));
    expect(getByText('account number cannot be empty')).toBeInTheDocument();
    expect(getByText('transfer account number cannot be empty')).toBeInTheDocument();
    expect(getByText('amount cannot be empty')).toBeInTheDocument();
    expect(getByText('currency must be either cad, usd, or mxn')).toBeInTheDocument();
  });

  it('should submit form, call createTransfer and display error', () => {
    const createTransfer = jest.fn();
    const {
      baseElement, getByTestId, getByText, rerender,
    } = render(<CreateTransfer
      createTransfer={createTransfer}
      closeModal={() => {}}
      isLoading={false}
      accountTransferSuccess={false}
      errorMessage=""
    />);

    fireEvent.change(getByTestId('createtransfer-accountNo'),
      { target: { value: '2345', name: 'accountNo' } });
    fireEvent.change(getByTestId('createtransfer-transferAccountNo'),
      { target: { value: '1234', name: 'transferAccountNo' } });
    fireEvent.change(getByTestId('createtransfer-amount'),
      { target: { value: '245', name: 'amount' } });
    fireEvent.change(getByTestId('createtransfer-currency'),
      { target: { value: 'usd', name: 'currency' } });
    fireEvent.click(getByTestId('createtransfer-transfer'));
    expect(createTransfer).toHaveBeenCalled();

    rerender(<CreateTransfer
      createTransfer={createTransfer}
      closeModal={() => {}}
      isLoading={false}
      accountTransferSuccess={false}
      errorMessage="An error occurred"
    />);
    expect(getByText('An error occurred')).toBeInTheDocument();
  });
});
