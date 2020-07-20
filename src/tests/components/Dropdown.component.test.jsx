import { render, fireEvent } from '@testing-library/react';
import React from 'react';

import Dropdown from '../../components/Dropdown/Dropdown.component';

describe('Dropdown Component', () => {
  const currencies = [
    { id: 'cad', name: 'CAD' },
    { id: 'usd', name: 'USD' },
    { id: 'mxn', name: 'MXN' },
  ];
  it('should render properly', () => {
    const { baseElement } = render(<Dropdown
            name="currency"
            value="usd"
            error=""
            onChange={() => {}}
            options={currencies}
            optionsTitleProperty="name"
            optionsValueProperty="id"
        />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should call onChange method when dropdownlist is changed', () => {
    const onChange = jest.fn();
    const { getByTestId } = render(<Dropdown
        name="currency"
        value="usd"
        error=""
        onChange={onChange}
        options={currencies}
        optionsTitleProperty="name"
        optionsValueProperty="id"
        dataTestId="dropdownlist-test"
    />);

    fireEvent.change(getByTestId('dropdownlist-test'), { target: { value: 'cad' } });
    expect(onChange).toHaveBeenCalled();
  });
});
