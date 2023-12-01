import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
// import { Provider } from 'react-redux';
// import { store } from './app/store';
import App from './App';
import '@testing-library/jest-dom';

describe('normal screen test suite', () => {
  test('renders front page', async () => {
    render(
      // <Provider store={store}>
      <App />,
      // </Provider>,
      { wrapper: BrowserRouter },
    );

    expect(screen.getByText('Welcome!')).toBeInTheDocument();
  });

  test('can navigate to login page', async () => {
    render(
      // <Provider store={store}>
      <App />,
      // </Provider>,
      { wrapper: BrowserRouter },
    );
    const user = userEvent.setup();
    await user.click(
      screen.getByRole('button', { name: 'account of current user' }),
    );
    expect(screen.getByText('Log in')).toBeInTheDocument();
  });
});
