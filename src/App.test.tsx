import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const app = render(<App />);
  //const linkElement = screen.getByText(/Shopping cart/i);
  expect(app).toMatchSnapshot();
});

