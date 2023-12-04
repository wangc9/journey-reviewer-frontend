import React from 'react';
import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../app/store';
import NaviBar from './NaviBar';
import '@testing-library/jest-dom';

test('Mobile test', async () => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  window.matchMedia('(max-width: 900px)');
  render(
    <Provider store={store}>
      <NaviBar />
    </Provider>,
    { wrapper: BrowserRouter },
  );
  const mobileButton = screen.getByRole('button', { name: 'show more' });
  expect(mobileButton).toBeInTheDocument();
});
