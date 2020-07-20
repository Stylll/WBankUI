import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import { CreateAccount } from '../../components/CreateAccount/CreateAccount.component';

describe('CreateAccount Test', () => {
  it('should render properly', () => {
    const { baseElement } = render(<CreateAccount
      createAccount={() => {}}
      closeModal={() => {}}
      isLoading={false}
      accountCreateSuccess={false}
      errorMessage=""
    />);
    expect(baseElement).toMatchSnapshot();
  });
  it('should validate the input', () => {
    const { baseElement, getByTestId, getByText } = render(<CreateAccount
      createAccount={() => {}}
      closeModal={() => {}}
      isLoading={false}
      accountCreateSuccess={false}
      errorMessage=""
    />);
    fireEvent.click(getByTestId('createaccount-create'));
    expect(getByText('name cannot be empty')).toBeInTheDocument();
    expect(getByText('opening balance cannot be empty')).toBeInTheDocument();
  });
  it('should submit form and call createAccount and display error', () => {
    const createAccount = jest.fn();
    const {
      baseElement, getByTestId, getByText, rerender,
    } = render(<CreateAccount
      createAccount={createAccount}
      closeModal={() => {}}
      isLoading={false}
      accountCreateSuccess={false}
      errorMessage=""
    />);

    fireEvent.change(getByTestId('createaccount-name'),
      { target: { value: 'My account', name: 'name' } });
    fireEvent.change(getByTestId('createaccount-openingBalance'),
      { target: { value: '245', name: 'openingBalance' } });
    fireEvent.click(getByTestId('createaccount-create'));
    expect(createAccount).toHaveBeenCalled();

    rerender(<CreateAccount
      createAccount={createAccount}
      closeModal={() => {}}
      isLoading={false}
      accountCreateSuccess={false}
      errorMessage="An error occurred"
    />);
    expect(getByText('An error occurred')).toBeInTheDocument();
  });
});
