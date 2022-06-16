import { render, screen } from '@testing-library/react';
import App from '../App';
import ReactDOM from "react-dom/client";

it("renders without crashing", () => {
  render(<App/>);
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/todos/i);
  expect(linkElement).toBeInTheDocument();
});
