/**
 * @jest-environment node
 */

/**
 * Note: Firebase relies on Node environment. The above line asks
 * jest to use the correct node environment. Otherwise, it will
 * use jsdom and encounter error "@firebase/auth: Auth (10.7.0):
 * INTERNAL ASSERTION FAILED: Could not find fetch implementation,
 * make sure you call FetchProvider.initialize() with an appropriate polyfill"
 */

import {
  Auth,
  UserCredential,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import userReducer, { addUser, deleteUser } from './userSlice';
import firebaseClient from '../../utils/firebase-client-config';

describe('user reducer', () => {
  let credential: UserCredential;
  let auth: Auth;

  beforeAll(async () => {
    auth = getAuth(firebaseClient);
    credential = await signInWithEmailAndPassword(
      auth,
      'test1700333156925@test.com',
      'qwerty123',
    );
  });

  it('Should have initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual({
      credential: undefined,
    });
  });

  it('Can add new user credential', () => {
    expect(userReducer(undefined, addUser(credential)).credential).toEqual(
      credential,
    );
  });

  it('can delete user', () => {
    expect(userReducer({ credential }, deleteUser())).toEqual({
      credential: undefined,
    });
  });

  afterAll(async () => {
    await signOut(auth);
  });
});
