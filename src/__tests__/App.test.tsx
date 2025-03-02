import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('renders App component with header', () => {
    render(<App />);
    const headerElement = screen.getByText('User Profile');
    expect(headerElement).toBeInTheDocument();
  });
});
