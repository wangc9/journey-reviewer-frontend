/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Auth, getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, useTheme, Box } from '@mui/material';
import { FirebaseApp, FirebaseError } from 'firebase/app';
import { ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../app/hooks';
import { addUser, UserState } from '../login/userSlice';

/**
 * A handling function for the log-in button.
 *
 * @param props - Props for the function.
 */
async function handleSignUp(props: {
  /** Form submit event. */
  e: React.FormEvent<HTMLFormElement>;

  /** Email typed in the form. */
  email: string;

  /** Password typed in the form. */
  password: string;

  /** Navigate function. */
  navigate: NavigateFunction;

  /** An `auth` instance of the Firebase project. */
  auth: Auth;

  /** A dispatch function from the `useAppDispatch` hook. */
  dispatch: ThunkDispatch<
    {
      user: UserState;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>;
}): Promise<void> {
  const { e, email, password, navigate, auth, dispatch } = props;
  e.preventDefault();
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (credential) {
      dispatch(addUser(credential));
      navigate('/');
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      // eslint-disable-next-line no-console
      console.log(error.message);
    }
  }
}

/**
 * Renders a sign-in page.
 *
 * @param props - Prop for the component.
 */
export default function SignUp(props: {
  /** A Firebase app instance. */
  firebaseApp: FirebaseApp;
}) {
  const { firebaseApp } = props;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const theme = useTheme();
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div style={{ display: 'flex', height: '100%' }}>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          margin: theme.spacing(2),
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        <Box
          sx={{
            flexGrow: 1,
            background: theme.palette.grey[100],
            padding: theme.spacing(6),
          }}
        >
          <h1 style={{ alignSelf: 'flex-start' }}>Sign up</h1>
          <form
            onSubmit={(e) => {
              handleSignUp({ e, email, password, navigate, auth, dispatch });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              label="email"
              aria-label="email"
              sx={{ margin: theme.spacing(1) }}
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="password"
              aria-label="login-password"
              type="password"
              sx={{ margin: theme.spacing(1) }}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              aria-label="login-button"
              sx={{ borderRadius: 13, padding: theme.spacing(1, 6) }}
            >
              Create and sign in
            </Button>
          </form>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </div>
  );
}
