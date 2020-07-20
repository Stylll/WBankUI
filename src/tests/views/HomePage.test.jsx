import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';

import HomePage from '../../views/HomePage/index';
import store from '../../redux/store/index';
import { getAccountsSuccess } from '../../redux/actionCreators/accountActions';

const accounts = [
  {
    accountName: 'AccountA', openingBalance: 300, accountNo: '234', currentBalance: 300,
  },
  {
    accountName: 'AccountB', openingBalance: 500, accountNo: '432', currentBalance: 500,
  },
];

describe('HomePage Test', () => {
  it('should render properly', () => {
    const { baseElement } = render(
        <Provider store={store}>
            <HomePage />
        </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should render fetching account records', () => {
    const { baseElement, getByTestId, getByText } = render(
        <Provider store={store}>
            <HomePage />
        </Provider>,
    );
    expect(getByText('fetching account records, hang tight...')).toBeInTheDocument();
    store.dispatch(getAccountsSuccess([]));
    expect(getByText('No account records.')).toBeInTheDocument();
  });

  it('should render list of accounts', () => {
    const { baseElement, getByTestId, getByText } = render(
        <Provider store={store}>
            <HomePage />
        </Provider>,
    );
    store.dispatch(getAccountsSuccess(accounts));
    expect(getByText('AccountA')).toBeInTheDocument();
    expect(getByText('AccountB')).toBeInTheDocument();
  });

  it('should render and close create account form', () => {
    const { getByTestId, getByText, queryByText } = render(
        <Provider store={store}>
            <HomePage />
        </Provider>,
    );
    fireEvent.click(getByTestId('create-account'));
    expect(getByText('Create your bank account')).toBeInTheDocument();
    fireEvent.click(getByTestId('modal-close'));
    expect(queryByText('Create your bank account')).not.toBeInTheDocument();
  });

  it('should render and close create deposit form', () => {
    const {
      baseElement, getByTestId, getByText, queryByText,
    } = render(
        <Provider store={store}>
            <HomePage />
        </Provider>,
    );
    fireEvent.click(getByTestId('create-deposit'));
    expect(getByText('Make a deposit')).toBeInTheDocument();
    fireEvent.click(getByTestId('modal-close'));
    expect(queryByText('Make a deposit')).not.toBeInTheDocument();
  });

  it('should render and close create withdrawal form', () => {
    const {
      getByTestId, getByText, queryByText,
    } = render(
        <Provider store={store}>
            <HomePage />
        </Provider>,
    );
    fireEvent.click(getByTestId('create-withdrawal'));
    expect(getByText('Make a withdrawal')).toBeInTheDocument();
    fireEvent.click(getByTestId('modal-close'));
    expect(queryByText('Make a withdrawal')).not.toBeInTheDocument();
  });

  it('should render and close create transfer form', () => {
    const { queryByText, getByTestId, getByText } = render(
        <Provider store={store}>
            <HomePage />
        </Provider>,
    );
    fireEvent.click(getByTestId('create-transfer'));
    expect(getByText('Make a transfer')).toBeInTheDocument();
    fireEvent.click(getByTestId('modal-close'));
    expect(queryByText('Make a transfer')).not.toBeInTheDocument();
  });
});
