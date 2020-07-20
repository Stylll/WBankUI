import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Button from '../../components/Button/Button.component';

describe('Button Component', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Button
        title="Deposit"
        handleClick={() => {}}
        />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render properly when disabled', () => {
    const { baseElement } = render(<Button
        title="Deposit"
        handleClick={() => {}}
        disabled
        />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render properly when showLoader is true', () => {
    const { baseElement } = render(<Button
        title="Deposit"
        handleClick={() => {}}
        showLoader
        />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should call handleClick method when button is clicked', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Button
        title="Deposit"
        handleClick={handleClick}
        showLoader
        dataTestId="button-test"
    />);

    fireEvent.click(getByTestId('button-test'));
    expect(handleClick).toHaveBeenCalled();
  });
});
