import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';

import SigninPage from '../../views/SigninPage/index';
import store from '../../redux/store/index';

describe('SigninPage Test', () => {
  it('should render properly', () => {
    const { baseElement } = render(
        <Provider store={store}>
            <SigninPage />
        </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should validate signin form', () => {
    const { baseElement, getByTestId, getByText } = render(
        <Provider store={store}>
            <SigninPage />
        </Provider>,
    );
    fireEvent.click(getByTestId('signin-signin'));
    expect(getByText('customerId cannot be empty')).toBeInTheDocument();
    expect(getByText('email cannot be empty')).toBeInTheDocument();
  });

  it('should require valid customer Id', () => {
    const { baseElement, getByTestId, getByText } = render(
        <Provider store={store}>
            <SigninPage />
        </Provider>,
    );
    fireEvent.change(getByTestId('signin-customerId'),
      { target: { value: 'customer', name: 'customerId' } });
    fireEvent.click(getByTestId('signin-signin'));
    expect(getByText('customerId must be a number')).toBeInTheDocument();
    expect(getByText('email cannot be empty')).toBeInTheDocument();
  });

  it('should update the isloading state', () => {
    const { baseElement, getByTestId } = render(
        <Provider store={store}>
            <SigninPage />
        </Provider>,
    );
    fireEvent.change(getByTestId('signin-customerId'),
      { target: { value: '123', name: 'customerId' } });
    fireEvent.change(getByTestId('signin-email'),
      { target: { value: 'email@email.com', name: 'email' } });
    fireEvent.click(getByTestId('signin-signin'));
    expect(store.getState().user.isLoading).toBe(true);
  });
});
