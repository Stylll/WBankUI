import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';

import SignupPage from '../../views/SignupPage/index';
import store from '../../redux/store/index';

describe('SignupPage Test', () => {
  it('should render properly', () => {
    const { baseElement } = render(
        <Provider store={store}>
            <SignupPage />
        </Provider>,
    );
    expect(baseElement).toMatchSnapshot();
  });

  it('should validate signup form', () => {
    const { baseElement, getByTestId, getByText } = render(
        <Provider store={store}>
            <SignupPage />
        </Provider>,
    );
    fireEvent.click(getByTestId('signup-signup'));
    expect(getByText('fullname cannot be empty')).toBeInTheDocument();
    expect(getByText('email cannot be empty')).toBeInTheDocument();
  });

  it('should require valid email', () => {
    const { baseElement, getByTestId, getByText } = render(
        <Provider store={store}>
            <SignupPage />
        </Provider>,
    );
    fireEvent.change(getByTestId('signup-email'),
      { target: { value: 'email', name: 'email' } });
    fireEvent.click(getByTestId('signup-signup'));
    expect(getByText('email is invalid')).toBeInTheDocument();
  });

  it('should update the isloading state', () => {
    const { baseElement, getByTestId } = render(
        <Provider store={store}>
            <SignupPage />
        </Provider>,
    );
    fireEvent.change(getByTestId('signup-fullname'),
      { target: { value: 'customer name', name: 'fullname' } });
    fireEvent.change(getByTestId('signup-email'),
      { target: { value: 'email@email.com', name: 'email' } });
    fireEvent.click(getByTestId('signup-signup'));
    expect(store.getState().user.isLoading).toBe(true);
  });
});
