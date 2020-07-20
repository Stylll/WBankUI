import { render } from '@testing-library/react';
import React from 'react';

import Loader from '../../components/Loader/Loader.component';

describe('Loader Component', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Loader />);

    expect(baseElement).toMatchSnapshot();
  });

  it('should render properly with message', () => {
    const { baseElement } = render(<Loader message="custom message" />);

    expect(baseElement).toMatchSnapshot();
  });
});
