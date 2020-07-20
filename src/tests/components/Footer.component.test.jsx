import { render } from '@testing-library/react';
import React from 'react';

import { Footer } from '../../components/Footer/Footer.component';

describe('Footer Component', () => {
  it('should render properly', () => {
    const { baseElement } = render(<Footer />);

    expect(baseElement).toMatchSnapshot();
  });
});
