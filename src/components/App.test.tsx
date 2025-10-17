import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import App from './App';

test('renders ActiveCampaign Dashboard header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const headerElement = screen.getByText(/ActiveCampaign Dashboard/i);
  expect(headerElement).toBeInTheDocument();
});

