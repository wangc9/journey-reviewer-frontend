/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { Auth, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, useTheme, Box } from '@mui/material';
import { FirebaseApp, FirebaseError } from 'firebase/app';
import { ThunkDispatch, AnyAction, Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../app/hooks';
import { addUser, UserState } from './userSlice';

async function handleSignIn(props: {
  e: React.FormEvent<HTMLFormElement>;
  email: string;
  password: string;
  navigate: NavigateFunction;
  auth: Auth;
  dispatch: ThunkDispatch<
    {
      user: UserState;
    },
    undefined,
    AnyAction
  > &
    Dispatch<AnyAction>;
}) {
  const { e, email, password, navigate, auth, dispatch } = props;
  e.preventDefault();
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
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

export default function Login(props: { firebaseApp: FirebaseApp }) {
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
          <h1 style={{ alignSelf: 'flex-start' }}>Log in</h1>
          <form
            onSubmit={(e) => {
              handleSignIn({ e, email, password, navigate, auth, dispatch });
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
              label="login-password"
              aria-label="password"
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
              sign in
            </Button>
          </form>
          <Box sx={{ flexGrow: 1, padding: theme.spacing(1) }} />
          <Box>
            <p>Don't have an account yet?</p>
            <Button variant="text" size="small">
              Create account
            </Button>
          </Box>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </div>
  );
}
