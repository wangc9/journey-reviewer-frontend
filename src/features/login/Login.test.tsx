/**
 * @jest-environment node
 */

/**
 * TODO: Try to figure out how to perform unit test. Current barrier:
 * conflict in jest environment. Firebase require node to connect,
 * testing-library require jsdom to mock events.
 * Possible alternative: use e2e tests instead.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { store } from '../../app/store';
import Login from './Login';
import '@testing-library/jest-dom';
import firebaseClient from '../../utils/firebase-client-config';

xdescribe('Login test', () => {
  let user: UserEvent;

  beforeAll(() => {
    user = userEvent.setup();
  });

  test('Can not login with wrong combination', async () => {
    // @ts-ignore
    const wrapper = ({ children }) => (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
    render(<Login firebaseApp={firebaseClient} />, { wrapper });
    const inputEmail = screen.getByRole('textbox', { name: 'email' });
    const inputPassword = screen.getByLabelText('login-password');

    await user.type(inputEmail, 'test1700333156925@test.com');
    await user.type(inputPassword, '123456');

    const logSpy = jest.spyOn(console, 'log');
    const button = screen.getByRole('button', { name: 'login-button' });
    await user.click(button);

    expect(logSpy).toHaveBeenCalledWith(
      'Firebase: Error (auth/wrong-password).',
    );
  });
});
