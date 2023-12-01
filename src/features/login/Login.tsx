/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { TextField, Button, useTheme, Box } from '@mui/material';
import { FirebaseApp } from 'firebase/app';

export default function Login(props: { firebaseApp: FirebaseApp }) {
  const { firebaseApp } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme();
  const auth = getAuth(firebaseApp);
  const navigate = useNavigate();
  async function handleSignIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  }

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
              handleSignIn(e);
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
              sx={{ margin: theme.spacing(1) }}
            />
            <TextField
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              label="password"
              type="password"
              sx={{ margin: theme.spacing(1) }}
            />
            <br />
            <Button
              variant="contained"
              color="primary"
              type="submit"
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
