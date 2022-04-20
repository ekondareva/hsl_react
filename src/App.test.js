import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const hslHeaderElement = screen.getByText(/HSL bikes/i);
  expect(hslHeaderElement).toBeInTheDocument();
});
