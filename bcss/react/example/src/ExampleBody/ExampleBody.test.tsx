import React from 'react';
import { render, screen } from '@testing-library/react';
import ExampleBody from './ExampleBody';

test('Renders NHS Number label', () => {
  render(<ExampleBody />);
  const labelElement = screen.getByText(/NHS Number/i);
  expect(labelElement).toBeInTheDocument();
});
