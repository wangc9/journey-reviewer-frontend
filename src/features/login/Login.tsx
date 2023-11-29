/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import * as firebaseui from 'firebaseui';
import firebase from 'firebase/compat/app';
import { FirebaseApp } from 'firebase/app';
import 'firebaseui/dist/firebaseui.css';
import { getAuth } from 'firebase/auth';

// TODO: Email enumeration protection
/**
 * The login component for user login and sign-up, take in a
 * `FirebaseApp` instance and return a place holder with
 * `id=firebaseui-auth-container`. A pre-built Firebase authUI
 * is inserted in the placeholder
 * @param props: {firebaseApp}
 * @returns `<Login firebaseApp={} />`
 */
function Login(props: { firebaseApp: FirebaseApp }) {
  const { firebaseApp } = props;
  const ui =
    firebaseui.auth.AuthUI.getInstance() ||
    new firebaseui.auth.AuthUI(getAuth(firebaseApp));

  ui.start('#firebaseui-auth-container', {
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      },
    ],
    signInFlow: 'popup',
    signInSuccessUrl: '/',
  });

  return <div id="firebaseui-auth-container" />;
}

export default Login;
