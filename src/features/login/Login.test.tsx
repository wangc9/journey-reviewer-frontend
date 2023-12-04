/**
 * TODO: Try to figure out how to perform unit test. Current barrier:
 * conflict in jest environment. Firebase require node to connect,
 * testing-library require jsdom to mock events.
 * Temporary solution: use mock functions.
 * Drawbacks: Only monitor whether function has been called, can not
 * test edge cases like incorrect password
 * Possible alternative: use e2e tests instead.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { store } from '../../app/store';
import Login from './Login';
import '@testing-library/jest-dom';
import firebaseClient from '../../utils/firebase-client-config';

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: () => jest.fn(),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve('Sign in successful'),
  ),
}));

jest.mock('../../app/hooks', () => ({
  useAppDispatch: () => jest.fn(),
}));

describe('Login test', () => {
  let user: UserEvent;

  beforeAll(() => {
    user = userEvent.setup();
  });

  test('Can login', async () => {
    render(
      <Provider store={store}>
        <Login firebaseApp={firebaseClient} />
      </Provider>,
      { wrapper: BrowserRouter },
    );
    const inputEmail = screen.getByRole('textbox', { name: 'email' });
    const inputPassword = screen.getByLabelText('login-password');

    await user.type(inputEmail, 'test1700333156925@test.com');
    await user.type(inputPassword, 'qwerty123');

    const button = screen.getByRole('button', { name: 'login-button' });
    await user.click(button);

    expect(signInWithEmailAndPassword).toHaveBeenCalled();
  });
});
