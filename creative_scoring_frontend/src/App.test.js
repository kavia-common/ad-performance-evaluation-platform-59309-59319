import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app top nav', () => {
  render(<App />);
  const brand = screen.getByText(/Creative Scoring/i);
  expect(brand).toBeInTheDocument();
});
